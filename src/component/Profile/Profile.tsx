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
const Profile: FunctionComponent<ProfileProps> = (props): JSX.Element=> {

	const { uid } = props;
	const { firestoreDatabase } = useFirebase();
	const userDocRef = doc(firestoreDatabase, 'users', uid);

	const {profileData, isLoading, errorCode} = useUsers(userDocRef);

	if (errorCode) {
		return <Redirect to={`/error/${errorCode}`} />;
	}

	return(
		<>
			<SC.Title>{isLoading ? <Loading/> : profileData && profileData.username}</SC.Title>
			<StyledProfile.Bio>{profileData && profileData.bio}</StyledProfile.Bio>
		</>
	);

}

export default Profile;

