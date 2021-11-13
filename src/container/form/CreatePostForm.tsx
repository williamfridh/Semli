import { collection, addDoc, doc, serverTimestamp, getDoc, setDoc } from "firebase/firestore";
import { FunctionComponent, useState } from "react";
import { Redirect } from "react-router";
import ResponseList from "component/ResponseList";
import { useFirebase } from "context/FirebaseContext";
import { HashtagName, NewPostDataProps, ResponseProps, SaveHashtagInterface } from "shared/types";
import * as SC from 'component/StyledComponents';
import Loading from "component/Loading";

const CreatePostForm: FunctionComponent = (): JSX.Element => {

	const { currentUser, firestoreDatabase } = useFirebase();

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
	 */
	const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
		
		let val = e.target.value;

		if (val.length > 200) {
			return;
		}

		setBody(val);
	}

	/**
	 * Handle hashtags change.
	 * 
	 * @param e - event to track.
	 */
	const handleHashtagChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
		
		let val = e.target.value;

		if (val.length > 150) {
			return;
		}

		setHashtag(val);
		setHashtagArr(hashtagStringToArray(val));
	}

	/**
	 * Turn hashtags string into array.
	 * 
	 * @returns the hashtags split into a array.
	 */
	const hashtagStringToArray = (string: string): string[] => {

		if (!string) {
			return [];
		}

		let newHashtagsArr: string[] = string.toLocaleLowerCase().replaceAll(" ", "").replaceAll("å", "a").replaceAll("ä", "a").replaceAll("ö", "o").split('#');
		newHashtagsArr = newHashtagsArr.filter((hashtag: HashtagName) => hashtag !== "");

		if (typeof newHashtagsArr !== 'object') {
			return [];
		}

		// Remove duplicates.
		newHashtagsArr = newHashtagsArr.filter((value: string, index: number, self: string[]): any => {
			return self.indexOf(value) === index;
		});
		
		return newHashtagsArr;
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
				newResponse.push({body: 'Body must be between 6-200 characters long.', type: 'error'});
				setResponse(newResponse);
			}
			if (!hashtagArr.length || hashtagArr.length > 15) {
				newResponse.push({body: 'You add between 1-15 hashtags.', type: 'error'});
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
				hashtags: hashtagArr,
				created: serverTimestamp(),
				user: doc(firestoreDatabase, 'users', currentUser.uid)
			}

			const newPostDocRef = await addDoc(collection(firestoreDatabase, `posts`), newPostData);

			// Save hashtag(s).
			hashtagArr.forEach((hashtag: HashtagName) => saveHashtag(hashtag, newPostDocRef));

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
			<SC.Row><SC.Textarea onChange={handleBodyChange} value={body} placeholder={`Type text here...*`} /></SC.Row>
			<SC.Row><SC.Textarea onChange={handleHashtagChange} value={hashtags} placeholder={`#example1 #example2 #example3*`} /></SC.Row>
			<SC.Row><SC.Button primary onClick={handlePostClick}><SC.ButtonText>Post</SC.ButtonText></SC.Button></SC.Row>
			{isLoading && <Loading/>}
			{isComplete && <Redirect to={`/`} />}
			{response && <SC.Row><ResponseList list={response} /></SC.Row>}
		</div>
	);
	
}

export default CreatePostForm;

