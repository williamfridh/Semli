import { doc, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { FunctionComponent } from "react";
import { useFirebase } from "context/FirebaseContext";
import { PostLikeProps, PostProps } from "shared/types";
import * as StyledPost from "./Post.styled";
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import useLikeUnlike from "hook/useLikeUnlike";
import useUsers from "hook/useUsers";

const Post: FunctionComponent<PostProps> = (props): JSX.Element => {

	const { id, body, hashtags, user } = props;
	const { firestoreDatabase, currentUserDocRef } = useFirebase();
	const postDocRef = doc(firestoreDatabase, `posts/${id}`);

	const {likes, handleClick} = useLikeUnlike(postDocRef, currentUserDocRef, props.likes as PostLikeProps[]);
	const {profileData} = useUsers(user);

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
				<StyledPost.Username to={profileData ? `/profile/${profileData.id}` : '/error/404'}>{profileData ? profileData.username : 'Loading...'}</StyledPost.Username>
			</StyledPost.By>
			
			<StyledPost.Body>{body}</StyledPost.Body>
			<StyledPost.HashtagHolder>{hashtagsCollection}</StyledPost.HashtagHolder>
			
			<StyledPost.LikeArea>
				<StyledPost.Likes><span>Liked by <b>{likes ? likes.length : 0}</b> {likes?.length === 1 ? `person` : `people`}</span></StyledPost.Likes>
				<StyledPost.LikeDislikeButton>{likeOrDislikeButton}</StyledPost.LikeDislikeButton>
			</StyledPost.LikeArea>

		</StyledPost.Container>
	);

}

export default Post;
