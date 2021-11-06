import { collection, addDoc, doc, serverTimestamp, getDoc, setDoc } from "firebase/firestore";
import { FunctionComponent, useState } from "react";
import { Redirect } from "react-router";
import ResponseList from "component/ResponseList";
import { useFirebase } from "context/FirebaseContext";
import { HashtagName, NewPostDataProps, ResponseProps, SaveHashtagInterface } from "shared/types";



const CreatePostForm: FunctionComponent = (): JSX.Element => {

	const { currentUser, firestoreDatabase } = useFirebase();

	const [body, setBody] 				= useState('');
	const [hashtags, setHashtag] 		= useState('');
	const [isLoading, setIsLoading] 	= useState(false);
	const [isComplete, setIsComplete] 	= useState(false);
	const [response, setResponse] 		= useState([] as ResponseProps[]);

	/**
	 * Handle body content change.
	 * 
	 * @param e - event to track.
	 */
	const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
		setBody(e.target.value);
	}

	/**
	 * Handle hashtags change.
	 * 
	 * @param e - event to track.
	 */
	const handleHashtagChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
		setHashtag(e.target.value);
	}

	/**
	 * Turn hashtags string into array.
	 * 
	 * @returns the hashtags split into a array.
	 */
	const splitHashtag = () => {

		if (!hashtags) {
			return [];
		}

		let hashtagsArr: string[] = hashtags.toLocaleLowerCase().replaceAll(" ", "").replaceAll("å", "a").replaceAll("ä", "a").replaceAll("ö", "o").split('#');
		hashtagsArr = hashtagsArr.filter((hashtag: HashtagName) => hashtag !== "");

		if (typeof hashtagsArr !== 'object') {
			return [];
		}
		
		return hashtagsArr;
	}

	/**
	 * Handle post click.
	 * 
	 * Assemble the new post data and create a new doc in firestoreDatabase.
	 */
	const handlePostClick = async (): Promise<void> => {

		try {

			if (!currentUser) {
				return;
			}

			let newResponse: ResponseProps[] = [];

			/**
			 * Check input.
			 */
			if (body.length < 6) {
				newResponse.push({body: 'Body must be minmum 6 characters long.', type: 'error'});
				setResponse(newResponse);
			}
			if (newResponse.length > 0) {
				setResponse(newResponse);
			}
			if (newResponse.length) {
				setResponse(newResponse);
				return;
			}

			setIsLoading(true);

			// Add post doc.
			const newPostData: NewPostDataProps = {
				body,
				hashtags: splitHashtag(),
				created: serverTimestamp(),
				user: doc(firestoreDatabase, 'users', currentUser.uid)
			}

			const newPostDocRef = await addDoc(collection(firestoreDatabase, `posts`), newPostData);

			// Save hashtag(s).
			splitHashtag().forEach((hashtag: HashtagName) => saveHashtag(hashtag, newPostDocRef));

			setIsLoading(false);
			setIsComplete(true);

		} catch (e) {
			console.error("Error adding document: ", e);
		}

	}

	/**
	 * Save hashtag.
	 * 
	 * @param hashtag - name of hashtag to save.
	 * @param newPostDocRef - ref to the new post.
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

	return(
		<div className="form">
			<textarea onChange={handleBodyChange} value={body} />
			<textarea onChange={handleHashtagChange} value={hashtags} />
			<button onClick={handlePostClick}>Test</button>
			{isLoading && <div>Loading...</div>}
			{isComplete && <Redirect to={`/feed`} />}
			{response && <ResponseList list={response} />}
		</div>
	);
	
}

export default CreatePostForm;

