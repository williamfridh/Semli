import { doc, getDoc } from "@firebase/firestore";
import { Firestore } from "firebase/firestore";
import { useEffect, useState } from "react";

interface useProfileInterface {
	(
		firestoreDatabase	: Firestore,
		uid					: string
	): useProfileProps
}

type useProfileProps = {
	res			: string,
	isLoading	: boolean,
	failed		: boolean
}

const useProfile: useProfileInterface = (firestoreDatabase, uid) => {
	
	const [res, setRes] 				= useState({} as DocumentData);
	const [isLoading, setIsLoading] 	= useState(false);
	const [failed, setFailed] 			= useState(false);

	useEffect(() => {

		let isMounted = true;

		const getProfile = async (uid: string): Promise<void> => {

			try {
				
				console.log(`Profile >> useEffect >> getProfile >> Running`);
				setIsLoading(true);
				setFailed(false);
		
				const userDocRef = doc(firestoreDatabase, 'users', uid);
				const userDocSnap = await getDoc(userDocRef);
		
				if (userDocSnap.exists()) {
					if (isMounted) {
						setRes(userDocSnap.data());
						setIsLoading(false);
					}
				} else {
					console.error(`useProfile >> useEffect >> getProfile >> No result.`);
					setFailed(true);
				}

			} catch (e) {
				console.error(`useProfile >> useEffect >> Dismounted >> ${e}`);
				setFailed(true);
				setIsLoading(false);
			}
	
		}

		getProfile(uid);

		return () => {
			console.log(`Profile >> useEffect >> Dismounted`);
			isMounted = false;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {res, isLoading, failed};

}

export default useProfile;