import { doc, DocumentData, QueryDocumentSnapshot, updateDoc, getDoc, DocumentSnapshot, DocumentReference } from "firebase/firestore";
import { FunctionComponent, useEffect, useState } from "react";
import { useFirebase } from "context/FirebaseContext";
import { PostLikeProps, PostProps } from "shared/types";
import * as StyledPost from "./Post.styled";
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';

const Post: FunctionComponent<PostProps> = (props): JSX.Element => {

	const { id, body, hashtags, likes, user } = props;
	const { currentUser, firestoreDatabase, currentUserDocRef } = useFirebase();
	const [postLikes, setPostLikes] = useState(likes ? likes : [] as PostLikeProps[]);
	const [userData, setUserData] = useState({} as DocumentData); // Unknown is OK here.
	const postDocRef = doc(firestoreDatabase, `posts/${id}`);

	/**
	 * Handle like click.
	 * 
	 * @param e - event of the click.
	 * @returns nothing.
	 */
	const handleLikeClick = async (): Promise<void> => {

		if (!currentUser || !currentUserDocRef) {
			return;
		}

		try {

			let action: 'add'|'remove';
			
			if (postLikes && postLikes.find((like: PostLikeProps) => like.id === currentUserDocRef.id)) {
				action = 'remove';
			} else {
				action = 'add';
			}

			let postNewLikes;

			switch(action) {
				case('add'):
					postNewLikes = [...postLikes, currentUserDocRef];
					break;
				case('remove'):
					postNewLikes = postLikes.filter((like: PostLikeProps) => like.id !== currentUserDocRef.id);
					break;
			}

			const userDataUpdate = {
				likes: postNewLikes
			};

			await updateDoc(postDocRef, userDataUpdate);

			setPostLikes(postNewLikes);

		} catch (e) {
			console.error(`Post >> handleLikeClick >> ${e}`);
		}

	}

	useEffect(() => {

		let isMounted = true;

		const loadUser = async (userRef: DocumentReference): Promise<void> => {

			console.log(`Post >> useEffect >> loadUser >> Running`);

			if (!isMounted) {
				return;
			}

			const userSnap = await getDoc(userRef);

			if (userSnap.exists()) {
				isMounted && setUserData(userSnap.data() as DocumentSnapshot<DocumentData>);
			} else {
				console.error(`Post >> useEffect >> loadUser >> User not found`);
			}

		}

		loadUser(user);

		return() => {
			console.log(`Post >> useEffect >> Dismounted`);
			isMounted = false;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const likeOrDislikeButton: React.ReactNode =
		postLikes &&
		currentUserDocRef && 
		postLikes.find((like: PostLikeProps) => like.id === currentUserDocRef.id) ?
		<MdFavorite onClick={handleLikeClick} /> :
		<MdFavoriteBorder onClick={handleLikeClick} />;

	const hashtagsCollection: React.ReactNode = hashtags.map((hashtag: QueryDocumentSnapshot<DocumentData>, key: number) => {
		return <StyledPost.Hashtag to={`/hashtag/${hashtag}`} key={key}><span>#{hashtag}</span></StyledPost.Hashtag>;
	});

	return(
		<StyledPost.Container>

			<StyledPost.By>
				<StyledPost.Username to={userData ? `/profile/${userData.id}` : '/error/404'}>{userData ? userData.username : 'Loading...'}</StyledPost.Username>
			</StyledPost.By>
			
			<StyledPost.Body>{body}</StyledPost.Body>
			<StyledPost.HashtagHolder>{hashtagsCollection}</StyledPost.HashtagHolder>
			
			<StyledPost.LikeArea>
				<StyledPost.Likes><span>Liked by <b>{postLikes.length}</b> {postLikes.length === 1 ? `person` : `people`}</span></StyledPost.Likes>
				<StyledPost.LikeDislikeButton>{likeOrDislikeButton}</StyledPost.LikeDislikeButton>
			</StyledPost.LikeArea>

		</StyledPost.Container>
	);

}

export default Post;
