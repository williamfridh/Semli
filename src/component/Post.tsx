import { doc, DocumentData, DocumentSnapshot, getDoc, QueryDocumentSnapshot, updateDoc } from "@firebase/firestore";
import { FunctionComponent, useState } from "react";
import { NavLink } from "react-router-dom";
import { useFirebase } from "../context/FirebaseContext";
import { PostLikeProps, PostInterface } from "../shared/types";



const Post: FunctionComponent<PostInterface> = (props): JSX.Element => {


	/**
	 * Setup.
	 */
	const { id, body, hashtags, likes } = props;
	const { currentUser, firestoreDatabase, currentUserDocRef, currentUserDocSnap } = useFirebase();
	const [postLikes, setPostLikes] = useState<PostLikeProps[]>(likes ? likes : []);
	const postDocRef = doc(firestoreDatabase, `posts/${id}`);



	/**
	 * Handle like click.
	 * 
	 * @param e - event of the click.
	 * @returns nothing.
	 */
	const handleLikeClick = async (e: React.MouseEvent<HTMLButtonElement>) => {

		if (!currentUser || !currentUserDocRef) {
			return;
		}

		let action: 'add'|'remove';

		const postDocSnap = await getDoc(postDocRef);

		const postDocSnapData: DocumentData|undefined = postDocSnap?.data();

		if (!postDocSnapData) {
			return;
		}
		
		const likesFromServer = postDocSnapData['likes'];
		
		if (likesFromServer && likesFromServer.find((like: DocumentSnapshot<DocumentData>) => like !== currentUserDocSnap)) {
			action = 'remove';
		} else {
			action = 'add';
		}

		let postNewLikes;

		switch(action) {
			case('add'):
				if (postNewLikes) {
					postNewLikes = [...likesFromServer, currentUserDocRef];
				} else {
					postNewLikes = [currentUserDocRef];
				}
				break;
			case('remove'):
				postNewLikes = likesFromServer.filter((like: PostLikeProps) => like === currentUserDocSnap);
				break;
		}

		const userDataUpdate = {
			likes: postNewLikes
		};

		await updateDoc(postDocRef, userDataUpdate);

		setPostLikes(postNewLikes);

	}



	/**
	 * Print content.
	 */
	return(
		<div className="post">
			<p>{body}</p>
			{
				hashtags.map((hashtag: QueryDocumentSnapshot<DocumentData>, key: number) => {
					return <NavLink to={`/hashtag/${hashtag}`} key={key}><span>#{hashtag}</span></NavLink>;
				})
			}
			<span>Likes: {postLikes ? postLikes?.length : 0}</span>
			<button onClick={handleLikeClick}>Like</button>
		</div>
	);

}

export default Post;
