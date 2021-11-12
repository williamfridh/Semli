import { FunctionComponent } from "react";
import { Redirect } from "react-router";
import { useFirebase } from "context/FirebaseContext";
import { ProfileProps } from "shared/types";
import * as SC from 'component/StyledComponents';
import * as StyledProfile from './Profile.styled';
import Loading from "component/Loading";
import useProfile from "hook/useProfile";



/**
 * Profile element.
 * 
 * @param props - Containing uid (user id.)
 * @returns 
 */
const Profile: FunctionComponent<ProfileProps> = (props): JSX.Element=> {

	const { uid } = props;
	const { firestoreDatabase } = useFirebase();

	const {profileData, isLoading, errorCode} = useProfile(firestoreDatabase, uid);

	if (errorCode) {
		return <Redirect to={`/error/${errorCode}`} />;
	}

	return(
		<div className="profile">
			<SC.Title>{isLoading ? <Loading/> : profileData && profileData.username}</SC.Title>
			<StyledProfile.Bio>{profileData && profileData.bio}</StyledProfile.Bio>
		</div>
	);

}

export default Profile;

