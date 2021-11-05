import { doc, DocumentData, getDoc } from "firebase/firestore";
import { FunctionComponent, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useFirebase } from "../../context/FirebaseContext";
import { ProfileProps } from "../../shared/types";
import * as GS from '../../shared/globalStyles';
import * as S from './Profile.styled';



/**
 * Profile element.
 * 
 * @param props - Containing uid (user id.)
 * @returns 
 */
const Profile: FunctionComponent<ProfileProps> = (props): JSX.Element=> {

	const { uid } = props;
	const { firestoreDatabase } = useFirebase();
	
	const [userData, setUserData] 			= useState({} as DocumentData);
	const [isLoading, setIsLoading] 		= useState(true);
	const [failedLoading, setFailedLoading] = useState(false);

	useEffect(() => {

		let isMounted = true;

		const getProfile = async (uid: string): Promise<void> => {

			try {
		
				const userDocRef = doc(firestoreDatabase, 'users', uid);
				const userDocSnap = await getDoc(userDocRef);
		
				if (userDocSnap.exists()) {
					if (isMounted) {
						setUserData(userDocSnap.data());
						setIsLoading(false);
					}
				} else {
					setFailedLoading(true);
				}

			} catch (e) {
				console.error(`Profile >> ${e}`);
			}
	
		}

		getProfile(uid);

		return () => {
			isMounted = false;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (failedLoading) {
		return <Redirect to="error/404" />;
	}

	return(
		<div className="profile">
			<GS.Title>{isLoading ? `Loading...` : userData && userData.username}</GS.Title>
			<S.ProfileBio>{isLoading ? `Loading...` : userData && userData.bio}</S.ProfileBio>
		</div>
	);

}

export default Profile;

