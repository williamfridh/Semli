import { doc, DocumentData, QueryDocumentSnapshot, updateDoc } from "firebase/firestore";
import { FunctionComponent, useState } from "react";
import { NavLink } from "react-router-dom";
import { useFirebase } from "../context/FirebaseContext";
import { PostLikeProps, PostProps } from "../shared/types";

const Post: FunctionComponent<PostProps> = (props): JSX.Element => {

	const { id, body, hashtags, likes } = props;
	const { currentUser, firestoreDatabase, currentUserDocRef, currentUserDocSnap } = useFirebase();
	const [postLikes, setPostLikes] = useState(likes ? likes : [] as PostLikeProps[]);
	const postDocRef = doc(firestoreDatabase, `posts/${id}`);

	/**
	 * Handle like click.
	 * 
	 * @param e - event of the click.
	 * @returns nothing.
	 */
	const handleLikeClick = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {

		if (!currentUser || !currentUserDocRef) {
			return;
		}

		let action: 'add'|'remove';
		
		if (postLikes && postLikes.find((like: PostLikeProps) => like !== currentUserDocSnap)) {
			action = 'remove';
		} else {
			action = 'add';
		}

		let postNewLikes;

		switch(action) {
			case('add'):
				if (postNewLikes) {
					postNewLikes = [...postLikes, currentUserDocRef];
				} else {
					postNewLikes = [currentUserDocRef];
				}
				break;
			case('remove'):
				postNewLikes = postLikes.filter((like: PostLikeProps) => like === currentUserDocSnap);
				break;
		}

		const userDataUpdate = {
			likes: postNewLikes
		};

		await updateDoc(postDocRef, userDataUpdate);

		setPostLikes(postNewLikes);

	}

	let likeOrDislikeButton: React.ReactNode =
		postLikes &&
		postLikes.find((like: PostLikeProps) => like !== currentUserDocSnap) ?
		<button onClick={handleLikeClick}>Dislike</button> :
		<button onClick={handleLikeClick}>Like</button>;

	const hashtagsCollection: React.ReactNode = hashtags.map((hashtag: QueryDocumentSnapshot<DocumentData>, key: number) => {
		return <NavLink to={`/hashtag/${hashtag}`} key={key}><span>#{hashtag}</span></NavLink>;
	});


	return(
		<div className="post">
			<p>{body}</p>
			{hashtagsCollection}
			<span>Likes: {postLikes ? postLikes?.length : 0}</span>
			{likeOrDislikeButton}
		</div>
	);

}

export default Post;
