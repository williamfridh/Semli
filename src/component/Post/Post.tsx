import { doc, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { FunctionComponent } from "react";
import { useFirebase } from "context/FirebaseContext";
import { PostLikeProps, PostProps } from "shared/types";
import * as StyledPost from "./Post.styled";
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import useLikeUnlike from "hook/useLikeUnlike";
import useUsers from "hook/useUsers";
import anonymousAvatar from "media/anonymous_avatar.png";

const Post: FunctionComponent<PostProps> = (props): JSX.Element => {

	const { post, refToPass } = props;
	const { firestoreDatabase, currentUserDocRef, currentUserDocSnap } = useFirebase();
	const postDocRef = doc(firestoreDatabase, `posts/${post.id}`);
	const postData = post.data();

	const dateObject = new Date(1970, 0, 1);
    dateObject.setSeconds(postData.created.seconds);

	const {likes, handleClick} = useLikeUnlike(postDocRef, currentUserDocRef, postData.likes as PostLikeProps[]);
	const {profileData} = useUsers(postData.user);

	const likeOrDislikeButton: React.ReactNode =
		likes &&
		currentUserDocRef && 
		likes.find((like: PostLikeProps) => like.id === currentUserDocRef.id) ?
		<MdFavorite onClick={handleClick} /> :
		<MdFavoriteBorder onClick={handleClick} />;

	const hashtagsCollection: React.ReactNode = postData.hashtags.map((hashtag: QueryDocumentSnapshot<DocumentData>, key: number) => {
		return <StyledPost.Hashtag to={`/hashtag/${hashtag}`} key={key}><span>#{hashtag}</span></StyledPost.Hashtag>;
	});

	return(
		<StyledPost.Container ref={refToPass}>

			<StyledPost.By>
				<StyledPost.Avatar>{profileData.avatar || <img src={anonymousAvatar} />}</StyledPost.Avatar>
				<StyledPost.ByData>
					<StyledPost.Username to={profileData ? `/profile/${profileData.id}` : '/error/404'}>{profileData ? profileData.username : 'Loading...'}</StyledPost.Username>
					<StyledPost.Timestamp>{dateObject.getFullYear()}-{dateObject.getMonth()}-{dateObject.getDate()} {dateObject.getHours()}:{dateObject.getMinutes()}</StyledPost.Timestamp>
				</StyledPost.ByData>
			</StyledPost.By>
			
			<StyledPost.Body>{postData.body}</StyledPost.Body>
			<StyledPost.HashtagHolder>{hashtagsCollection}</StyledPost.HashtagHolder>
			
			<StyledPost.LikeArea>
				<StyledPost.Likes><span>Liked by <b>{likes ? likes.length : 0}</b> {likes?.length === 1 ? `person` : `people`}</span></StyledPost.Likes>
				{currentUserDocSnap && <StyledPost.LikeDislikeButton>{likeOrDislikeButton}</StyledPost.LikeDislikeButton>}
			</StyledPost.LikeArea>

		</StyledPost.Container>
	);

}

export default Post;
