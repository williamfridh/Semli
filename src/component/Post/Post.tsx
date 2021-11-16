import { doc, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { FunctionComponent } from "react";
import { useFirebase } from "context/FirebaseContext";
import { PostLikeProps, PostProps } from "shared/types";
import * as StyledPost from "./Post.styled";
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import useLikeUnlike from "hook/useLikeUnlike";
import useUsers from "hook/useUsers";
import anonymousAvatar from "media/anonymous_avatar.png";
import LikeField from "component/LikeField";

const Post: FunctionComponent<PostProps> = (props): JSX.Element => {

	const { post, refToPass } = props;
	const { currentUserDocSnap } = useFirebase();
	const postData = post.data() as DocumentData;
	const {profileData, profilePicUrl} 	= useUsers(postData.user);

	const dateObject = new Date(1970, 0, 1);
    dateObject.setSeconds(postData.created.seconds);

	return(
		<StyledPost.Container ref={refToPass}>

			<StyledPost.By>
				<StyledPost.Avatar>{profileData && <img src={profileData.hasProfilePic ? profilePicUrl : anonymousAvatar} />}</StyledPost.Avatar>
				<StyledPost.ByData>
					<StyledPost.Username to={profileData ? `/profile/${profileData.id}` : '/error/404'}>{profileData ? profileData.username : 'Loading...'}</StyledPost.Username>
					<StyledPost.Timestamp>{dateObject.getFullYear()}-{dateObject.getMonth()}-{dateObject.getDate()} {dateObject.getHours()}:{dateObject.getMinutes()}</StyledPost.Timestamp>
				</StyledPost.ByData>
			</StyledPost.By>
			
			<StyledPost.Body>{postData.body}</StyledPost.Body>
			<StyledPost.HashtagHolder>{
				postData.hashtags.map((hashtag: QueryDocumentSnapshot<DocumentData>, key: number) => {
					return <StyledPost.Hashtag to={`/hashtag/${hashtag}`} key={key}><span>#{hashtag}</span></StyledPost.Hashtag>;
				})
			}</StyledPost.HashtagHolder>
			
			<LikeField currentUserDocSnap={currentUserDocSnap} postDocSnap={post} />

		</StyledPost.Container>
	);

}

export default Post;
