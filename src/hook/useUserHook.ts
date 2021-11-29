import { DocumentData, DocumentReference, getDoc } from "@firebase/firestore";
import { getDownloadURL, getStorage, ref } from "@firebase/storage";
import { useEffect, useState } from "react";



/**
 * Types.
 */
type useUserHookType = (
	userDocRef			: DocumentReference<DocumentData>
) => useUserHookProps;

type useUserHookProps = {
	profileData					: DocumentData,
	originalProfilePicUrl		: string,
	compressedProfilePicUrl		: string,
	isLoading					: boolean,
	errorCode					: number|null
}



/**
 * Use User Hook.
 * 
 * This hook loads user data.
 * 
 * @param userDocRef - user for targeting the user.
 * @returns - A hook.
 */
const useUserHook: useUserHookType = (userDocRef) => {
	
	const [profileData, setProfileData] 							= useState({} as DocumentData);
	const [originalProfilePicUrl, setOriginalProfilePicUrl]			= useState('');
	const [compressedProfilePicUrl, setCompressedProfilePicUrl]		= useState('');
	const [isLoading, setIsLoading] 								= useState(false);
	const [errorCode, setErrorCode] 								= useState<number|null>(null);



	/**
	 * This hook triggers on mount and fetches the suer data.
	 */
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
					console.error(`useUserHook >> useEffect >> getProfile >> No result.`);
					throw new Error('404');
				}

				try {
		
					if (userDocSnapData.profilePicExists) {
						const storage = getStorage();
						
						const originalProfilePicRef = ref(storage, `users/${userDocRef.id}/avatar.${userDocSnapData.profilePicExtension}`);
						const compressedProfilePicRef = ref(storage, `users/${userDocRef.id}/avatar_400x400.webp`);

						const originalProfilePicDownloadURL = await getDownloadURL(originalProfilePicRef);
						const compressedProfilePicDownloadURL = await getDownloadURL(compressedProfilePicRef);

						setOriginalProfilePicUrl(originalProfilePicDownloadURL);
						setCompressedProfilePicUrl(compressedProfilePicDownloadURL);
					}

				} catch(e) {
					console.error(`useUserHook >> useEffect >> ${e}`);
					console.warn(`Default profile pic will be used.`);
				}

				console.log(`useUserHook >> useEffect >> getProfile >> Success.`);

			} catch(e) {
				setErrorCode(400);
				console.error(`useUserHook >> useEffect >> ${e}`);
			} finally {
				setIsLoading(false);
			}

		}

		getUser();

		return () => {
			console.log(`Profile >> useEffect >> Dismounted`);
			isMounted = false;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);



	/**
	 * Returns the hook content.
	 */
	return {profileData, originalProfilePicUrl, compressedProfilePicUrl, isLoading, errorCode};

}

export default useUserHook;