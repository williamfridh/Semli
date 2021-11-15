import { DocumentData, DocumentReference, getDoc } from "@firebase/firestore";
import { getDownloadURL, getStorage, ref } from "@firebase/storage";
import { useEffect, useState } from "react";

interface useUsersInterface {
	(
		userDocRef				: DocumentReference<DocumentData>
	): useUsersProps
}

type useUsersProps = {
	profileData			: DocumentData,
	profilePicUrl		: string,
	isLoading			: boolean,
	errorCode			: number|null
}

const useUsers: useUsersInterface = (userDocRef) => {
	
	const [profileData, setProfileData] 		= useState({} as DocumentData);
	const [profilePicUrl, setProfilePicUrl]		= useState('');
	const [isLoading, setIsLoading] 			= useState(false);
	const [errorCode, setErrorCode] 			= useState<number|null>(null);

	useEffect(() => {

		let isMounted = true;
				
		console.log(`Profile >> useEffect >> getProfile >> Running`);
		setIsLoading(true);
		setErrorCode(null);

		const getUser = async () => {

			try {

				const userDocSnap = await getDoc(userDocRef);

				if (!isMounted) return;
	
				const userDocSnapData = userDocSnap.data() as DocumentData;
				
				if (userDocSnap.exists()) {
					setProfileData(userDocSnapData);
				} else {
					console.error(`useUsers >> useEffect >> getProfile >> No result.`);
					throw 404;
				}
	
				if (userDocSnapData.hasProfilePic) {
					const storage = getStorage();
					const profilePicRef = ref(storage, `profile_picture/${userDocSnapData.id}.${userDocSnapData.profilePicExtension}`);

					const downloadURL = await getDownloadURL(profilePicRef);
					setProfilePicUrl(downloadURL);
				}

				setIsLoading(false);
				console.log(`useUsers >> useEffect >> getProfile >> Success.`);

			} catch(e) {
				setErrorCode(400);
				setIsLoading(false);
				console.error(`useUsers >> useEffect >> ${e}`);
			}

		}

		getUser();

		return () => {
			console.log(`Profile >> useEffect >> Dismounted`);
			isMounted = false;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {profileData, profilePicUrl, isLoading, errorCode};

}

export default useUsers;