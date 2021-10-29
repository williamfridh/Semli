import { doc, DocumentData, getDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useFirebase } from "../context/FirebaseContext";

/**
 * Types.
 */
type ProfileProps = {
	uid: string
}



/**
 * 
 * @param props 
 * @returns 
 */
const Profile = (props: ProfileProps) => {

	/**
	 * Setup.
	 */
	let { uid } = props;
	let { firestoreDatabase } = useFirebase();
	const [userData, setUserData] = useState<DocumentData|undefined>(undefined);
	const [isLoading, setIsLoading] = useState(true);



	/**
	 * Hooks.
	 */
	useEffect(() => {

		let isMounted = true;

		/**
		 * Get profile.
		 */
		const getProfile = async (uid: string) => {
	
			const userDocRef = doc(firestoreDatabase, 'users', uid);
			const userDocSnap = await getDoc(userDocRef);
	
			if (userDocSnap.exists()) {
				if (isMounted) {
					setUserData(userDocSnap.data());
					setIsLoading(false);
				}
			} else {
				// Redirect the user.
			}
	
		}

		getProfile(uid);

		return () => {
			isMounted = false;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);



	/**
	 * Main content.
	 */
	return(
		<div className="profile">
			<h1>{isLoading ? `Loading...` : userData && userData.username}</h1>
			<p>{isLoading ? `Loading...` : userData && userData.bio}</p>
		</div>
	);

}

export default Profile;

