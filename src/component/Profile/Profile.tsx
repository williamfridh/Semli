import { FunctionComponent } from "react";
import { Redirect } from "react-router";
import { useFirebase } from "context/FirebaseContext";
import * as SC from 'component/StyledComponents';
import * as StyledProfile from './Profile.styled';
import Loading from "component/Loading";
import useUserHook from "hook/useUserHook";
import { doc } from "@firebase/firestore";
import anonymousAvatar from "media/anonymous_avatar.png";



/**
 * Types.
 */
type ProfileProps =  {
	uid: string
}



/**
 * Profile element.
 * 
 * @param props - Containing uid (user id.)
 * @returns 
 */
const Profile: FunctionComponent<ProfileProps> = ({ uid }): JSX.Element=> {

	const { firestoreDatabase } = useFirebase();
	const userDocRef = doc(firestoreDatabase, 'users', uid);
	const {
		profileData,
		compressedProfilePicUrl,
		isLoading,
		errorCode
	} = useUserHook(userDocRef);

	if (errorCode) return <Redirect to={`/error/${errorCode}`} />;

	return <>
		{isLoading || <StyledProfile.Pic><img src={compressedProfilePicUrl ? compressedProfilePicUrl : anonymousAvatar} alt={`Profile pic of ${profileData.username}`} /></StyledProfile.Pic>}
		<SC.Title>{isLoading ? <Loading/> : profileData && profileData.username}</SC.Title>
		<StyledProfile.Bio>{isLoading && profileData && profileData.bio}</StyledProfile.Bio>
	</>;

}

export default Profile;

