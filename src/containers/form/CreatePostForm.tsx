import { collection, addDoc, doc, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { Redirect } from "react-router";
import ResponseList from "../../component/ResponseList";
import { useFirebase } from "../../context/FirebaseContext";
import { NewPostDataProps, ResponseProps } from "../../shared/types";



const CreatePostForm = () => {

	/**
	 * Setup.
	 */
	const { currentUser, firestoreDatabase } = useFirebase();
	const [body, setBody] = useState('');
	const [hashtags, setHashtag] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const [response, setResponse] = useState<ResponseProps[]>([]);



	/**
	 * handle body content change.
	 * 
	 * @param e - event to track.
	 */
	const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
		const val = e.target.value;
		setBody(val);
	}



	/**
	 * Handle hashtags change.
	 * 
	 * @param e - event to track.
	 */
	const handleHashtagChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
		const val = e.target.value;
		setHashtag(val);
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

		let hashtagsArr: string[]|undefined|void = hashtags.toLocaleLowerCase().replaceAll(" ", "").replaceAll("å", "a").replaceAll("ä", "a").replaceAll("ö", "o").split('#');
		hashtagsArr = hashtagsArr.filter(hashtag => hashtag !== "");

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
	const handlePostClick = async () => {

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
				return;
			}

			setIsLoading(true);

			const newPostData: NewPostDataProps = {
				body,
				hashtags: splitHashtag(),
				created: serverTimestamp(),
				user: doc(firestoreDatabase, 'users', currentUser.uid)
			}

			await addDoc(collection(firestoreDatabase, `posts`), newPostData);

			setIsLoading(false);
			setIsComplete(true);

		} catch (e) {
			console.error("Error adding document: ", e);
		}

	}


	/**
	 * Main content.
	 */
	return(
		<div className="form">
			<textarea onChange={handleBodyChange} value={body} />
			<textarea onChange={handleHashtagChange} value={hashtags} />
			<button onClick={handlePostClick}>Test</button>
			{isLoading && <div>Loading...</div>}
			{isComplete && <Redirect to={`/feed`} />}
			<ResponseList list={response} />
		</div>
	);
	
}

export default CreatePostForm;

