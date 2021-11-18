import { 
	collection,
	addDoc,
	doc,
	serverTimestamp,
	getDoc,
	setDoc,
	DocumentSnapshot,
	Firestore,
	DocumentData
} from "@firebase/firestore";
import { useState } from "react";
import {
	HashtagName,
	NewPostDataProps,
	ResponseProps,
	SaveHashtagInterface
} from "shared/types";



/**
 * Types & interfaces.
 */
interface UseCreatePostFormHookInterface {
	(
		currentUserDocSnap	: DocumentSnapshot<DocumentData> | null,
		firestoreDatabase	: Firestore
	): UseCreatePostFormHookReturn
}

type UseCreatePostFormHookReturn = {
	body					: string,
	handleBodyChange		: HandleBodyChangeInterface,
	hashtags				: string,
	handleHashtagChange		: HandleHashtagChangeInterface,
	handlePostClick			: HandlePostClickInterface,
	isLoading				: boolean,
	isComplete				: boolean,
	response				: ResponseProps[]
}

interface HandleBodyChangeInterface {
	(
		e: React.ChangeEvent<HTMLTextAreaElement>
	): void
}

interface HandleHashtagChangeInterface {
	(
		e: React.ChangeEvent<HTMLTextAreaElement>
	): void
}

interface HashtagStringToArrayInterface {
	(
		string: string
	): string[]
}

interface HandlePostClickInterface {
	(): Promise<void>
}

interface CheckProvidedDataInterface {
	(): boolean
}


/**
 * Use Create Post Form Hook
 * 
 * This hook is used for seperating logic from a file containing view.
 * 
 * @param currentUserDocSnap - a Firestore doc containing a user.
 * @param firestoreDatabase - a Firestore instance.
 * @returns a hook.
 */
const useCreatePostFormHook: UseCreatePostFormHookInterface = (currentUserDocSnap, firestoreDatabase) => {

	const [body, setBody] 					= useState('');
	const [hashtags, setHashtag] 			= useState('');
	const [hashtagArr, setHashtagArr] 		= useState([] as string[]);
	const [isLoading, setIsLoading] 		= useState(false);
	const [isComplete, setIsComplete] 		= useState(false);
	const [response, setResponse] 			= useState([] as ResponseProps[]);

	/**
	 * Handle body content change.
	 * 
	 * @param e - event to track.
	 * @returns - nothing.
	 */
	const handleBodyChange: HandleBodyChangeInterface = e => {
		const val = e.target.value;
		if (val.length > 200) return;
		setBody(val);
	}

	/**
	 * Handle hashtags change.
	 * 
	 * @param e - event to track.
	 * @returns - nothing.
	 */
	const handleHashtagChange: HandleHashtagChangeInterface = e => {
		const val = e.target.value;
		if (val.length > 150) return;
		setHashtag(val);
		setHashtagArr(hashtagStringToArray(val));
	}

	/**
	 * Turn a string containing hashtags into an array of hashtags.
	 * 
	 * @param - strin containing hashtags.
	 * @returns - the hashtags split into a array.
	 */
	const hashtagStringToArray: HashtagStringToArrayInterface = string => {

		if (!string) return [];

		let newHashtagsArr: string[] = string.toLocaleLowerCase().replaceAll(" ", "").replaceAll("å", "a").replaceAll("ä", "a").replaceAll("ö", "o").split('#');
		newHashtagsArr = newHashtagsArr.filter((hashtag: HashtagName) => hashtag !== "");

		if (typeof newHashtagsArr !== 'object') return [];

		// Remove duplicates.
		newHashtagsArr = newHashtagsArr.filter((value: string, index: number, self: string[]): any => {
			return self.indexOf(value) === index;
		});
		
		return newHashtagsArr;
	}

	/**
	 * Check provided data.
	 * 
	 * @returns - true|false depending on check result.
	 */
	const checkProvidedData: CheckProvidedDataInterface = () => {

		let newResponse: ResponseProps[] = [];

		/**
		 * Check input.
		 */
		if (body.length < 6) {
			newResponse.push({body: 'Body must be between 6-200 characters long.', type: 'error'});
			setResponse(newResponse);
		}
		if (!hashtagArr.length || hashtagArr.length > 15) {
			newResponse.push({body: 'You add between 1-15 hashtags.', type: 'error'});
			setResponse(newResponse);
		}
		if (newResponse.length) {
			setResponse(newResponse);
			return false;
		} else {
			return true;
		}

	}

	/**
	 * Handle post click.
	 * 
	 * Assemble the new post data and create a new doc in firestoreDatabase.
	 * 
	 * @return - a promise that returns void.
	 */
	const handlePostClick: HandlePostClickInterface = async () => {

		try {

			if (!currentUserDocSnap) return;

			if (!checkProvidedData()) return;

			setIsLoading(true);

			const newPostData: NewPostDataProps = {
				body,
				hashtags: hashtagArr,
				created: serverTimestamp(),
				user: doc(firestoreDatabase, 'users', currentUserDocSnap.id)
			}

			const newPostDocRef = await addDoc(collection(firestoreDatabase, `posts`), newPostData);

			hashtagArr.forEach((hashtag: HashtagName) => saveHashtag(hashtag, newPostDocRef));

			setIsLoading(false);
			setIsComplete(true);

		} catch (e) {
			console.error("Error adding document: ", e);
		} finally {
			setIsLoading(false);
		}

	}

	/**
	 * Save hashtag in database.
	 * 
	 * @param hashtag - name of hashtag to save.
	 * @param newPostDocRef - ref to the new post.
	 * @return - a promise containing void.
	 */
	const saveHashtag: SaveHashtagInterface = async (hashtag, newPostDocRef) => {

		try {

			const hashtahDocRef = doc(firestoreDatabase, `hashtags/${hashtag}`);
			const hashtahDocSnap = await getDoc(hashtahDocRef);

			if (hashtahDocSnap.exists()) {
				const { amount, posts } = hashtahDocSnap.data();
				await setDoc(hashtahDocRef, {
					name: hashtag,
					amount: (amount+1),
					posts: [...posts, newPostDocRef]
				});
			} else {
				await setDoc(hashtahDocRef, {
					name: hashtag,
					amount: 1,
					posts: [newPostDocRef]
				});
			}

		} catch (e) {
			console.error("Error adding document: ", e);
		}

	}

	/**
	 * Return all of which is required.
	 */
	return {
		body,
		handleBodyChange,
		hashtags,
		handleHashtagChange,
		handlePostClick,
		isLoading,
		isComplete,
		response
	};
	
}

export default useCreatePostFormHook;

