import { doc, DocumentData, getDoc } from "@firebase/firestore";
import { Firestore } from "firebase/firestore";
import { useEffect, useState } from "react";

interface useProfileInterface {
	(
		firestoreDatabase	: Firestore,
		uid					: string
	): useProfileProps
}

type useProfileProps = {
	profileData			: DocumentData,
	isLoading			: boolean,
	errorCode			: number|null
}

const useProfile: useProfileInterface = (firestoreDatabase, uid) => {
	
	const [profileData, setProfileData] 		= useState({} as DocumentData);
	const [isLoading, setIsLoading] 			= useState(false);
	const [errorCode, setErrorCode] 			= useState<number|null>(null);

	useEffect(() => {

		let isMounted = true;
				
		console.log(`Profile >> useEffect >> getProfile >> Running`);
		setIsLoading(true);
		setErrorCode(null);
		
		const userDocRef = doc(firestoreDatabase, 'users', uid);

		getDoc(userDocRef).then(userDocSnap => {

			if (!isMounted) {
				return;
			}
			
			if (userDocSnap.exists()) {
				setProfileData(userDocSnap.data());
				setIsLoading(false);
				console.log(`useProfile >> useEffect >> getProfile >> Success.`);
			} else {
				console.error(`useProfile >> useEffect >> getProfile >> No result.`);
				setErrorCode(404);
			}

		}).catch(e => {
			console.error(`useProfile >> useEffect >> Dismounted >> ${e}`);
			setErrorCode(400);
			setIsLoading(false);
		});

		return () => {
			console.log(`Profile >> useEffect >> Dismounted`);
			isMounted = false;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [uid]);

	return {profileData, isLoading, errorCode};

}

export default useProfile;