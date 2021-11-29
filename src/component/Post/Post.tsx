import { DocumentData, QueryDocumentSnapshot, DocumentSnapshot } from "@firebase/firestore";
import { FunctionComponent } from "react";
import { useFirebase } from "context/FirebaseContext";
import * as StyledPost from "./Post.styled";
import useUserHook from "hook/useUserHook";
import anonymousAvatar from "media/anonymous_avatar.png";
import LikeField from "component/LikeField";


type PostProps = {
	postDocSnap		: DocumentSnapshot<DocumentData>,
	refToPass		?: any // Allowed here.
}

const Post: FunctionComponent<PostProps> = ({ postDocSnap, refToPass }): JSX.Element => {
	
	const { currentUserDocSnap } = useFirebase();
	const postData = postDocSnap.data() as DocumentData;
	const {profileData, compressedProfilePicUrl} 	= useUserHook(postData.user);

	const dateObject = new Date(1970, 0, 1);
    dateObject.setSeconds(postData.created.seconds);

	return(
		<StyledPost.Container ref={refToPass}>

			<StyledPost.By>
				<StyledPost.Avatar>{profileData && <img src={compressedProfilePicUrl ? compressedProfilePicUrl : anonymousAvatar} alt={`Profile pic of ${profileData.username}`} />}</StyledPost.Avatar>
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
			
			<LikeField postDocSnap={postDocSnap} currentUserDocSnap={currentUserDocSnap} />

		</StyledPost.Container>
	);

}

export default Post;
