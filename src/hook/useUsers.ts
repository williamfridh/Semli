import { DocumentData, DocumentReference, getDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";

interface useUsersInterface {
	(
		userDocRef				: DocumentReference<DocumentData>
	): useUsersProps
}

type useUsersProps = {
	profileData			: DocumentData,
	isLoading			: boolean,
	errorCode			: number|null
}

const useUsers: useUsersInterface = (userDocRef) => {
	
	const [profileData, setProfileData] 		= useState({} as DocumentData);
	const [isLoading, setIsLoading] 			= useState(false);
	const [errorCode, setErrorCode] 			= useState<number|null>(null);

	useEffect(() => {

		let isMounted = true;
				
		console.log(`Profile >> useEffect >> getProfile >> Running`);
		setIsLoading(true);
		setErrorCode(null);

		getDoc(userDocRef).then(userDocSnap => {

			if (!isMounted) {
				return;
			}
			
			if (userDocSnap.exists()) {
				setProfileData(userDocSnap.data());
				setIsLoading(false);
				console.log(`useUsers >> useEffect >> getProfile >> Success.`);
			} else {
				setErrorCode(404);
				console.error(`useUsers >> useEffect >> getProfile >> No result.`);
			}

		}).catch(e => {
			setErrorCode(400);
			setIsLoading(false);
			console.error(`useUsers >> useEffect >> ${e}`);
		});

		return () => {
			console.log(`Profile >> useEffect >> Dismounted`);
			isMounted = false;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {profileData, isLoading, errorCode};

}

export default useUsers;