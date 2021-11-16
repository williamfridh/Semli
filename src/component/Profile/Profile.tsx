import { FunctionComponent } from "react";
import { Redirect } from "react-router";
import { useFirebase } from "context/FirebaseContext";
import { ProfileProps } from "shared/types";
import * as SC from 'component/StyledComponents';
import * as StyledProfile from './Profile.styled';
import Loading from "component/Loading";
import useUsers from "hook/useUsers";
import { doc } from "@firebase/firestore";



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
		profilePicUrl,
		isLoading,
		errorCode
	} = useUsers(userDocRef);

	if (errorCode) return <Redirect to={`/error/${errorCode}`} />;

	return <>
		{isLoading || profileData.hasProfilePic && <StyledProfile.Pic><img src={profilePicUrl} /></StyledProfile.Pic>}
		<SC.Title>{isLoading ? <Loading/> : profileData && profileData.username}</SC.Title>
		<StyledProfile.Bio>{isLoading && profileData && profileData.bio}</StyledProfile.Bio>
	</>;

}

export default Profile;

