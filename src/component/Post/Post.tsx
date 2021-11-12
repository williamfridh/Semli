import { doc, DocumentData, QueryDocumentSnapshot, getDoc, DocumentSnapshot, DocumentReference } from "firebase/firestore";
import { FunctionComponent, useEffect, useState } from "react";
import { useFirebase } from "context/FirebaseContext";
import { PostLikeProps, PostProps } from "shared/types";
import * as StyledPost from "./Post.styled";
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import useLike from "hook/useLike";

const Post: FunctionComponent<PostProps> = (props): JSX.Element => {

	const { id, body, hashtags, user } = props;
	const { firestoreDatabase, currentUserDocRef } = useFirebase();
	const [userData, setUserData] = useState({} as DocumentData);
	const postDocRef = doc(firestoreDatabase, `posts/${id}`);

	const {likes, handleClick, isLoading, failedToLoad} = useLike(postDocRef, currentUserDocRef, props.likes as PostLikeProps[]);

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
		likes &&
		currentUserDocRef && 
		likes.find((like: PostLikeProps) => like.id === currentUserDocRef.id) ?
		<MdFavorite onClick={handleClick} /> :
		<MdFavoriteBorder onClick={handleClick} />;

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
				<StyledPost.Likes><span>Liked by <b>{likes.length}</b> {likes.length === 1 ? `person` : `people`}</span></StyledPost.Likes>
				<StyledPost.LikeDislikeButton>{likeOrDislikeButton}</StyledPost.LikeDislikeButton>
			</StyledPost.LikeArea>

		</StyledPost.Container>
	);

}

export default Post;
