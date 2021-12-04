import {
	collection,
	DocumentData,
	Firestore,
	getDoc,
	getDocs,
	query,
	QueryDocumentSnapshot,
	updateDoc,
	where
} from "@firebase/firestore";
import {
	getStorage,
	ref,
	uploadBytes,
	deleteObject
} from "@firebase/storage";
import { useState } from "react";
import { ResponseProps } from "shared/types";
import { DocumentSnapshot } from "firebase/firestore";



/**
 * Types.
 */
type UseEditProfileFormHookType = (
	firestoreDatabase: Firestore,
	currentUserDocSnap: DocumentSnapshot<DocumentData> | null,
	setCurrentUserDocSnap: React.Dispatch<React.SetStateAction<DocumentSnapshot<DocumentData> | null>> | null
) => UseEditProfileFormHookReturn;

type UseEditProfileFormHookReturn = {
	handleProfilePicChange		: HandleProfilePicChangeType,
	profilePicPath				: string,
	handleUsernameChange		: HandleUsernameChangeType,
	username					: string,
	handleBioChange				: HandleBioChangeType,
	bio							: string,
	handlePostClick				: HandlePostClickType,
	response					: ResponseProps[],
	isLoading					: boolean
}

type HandleProfilePicChangeType = (e: React.ChangeEvent<HTMLInputElement>) => void;

type HandleUsernameChangeType = (e: React.ChangeEvent<HTMLInputElement>) => void;

type HandleBioChangeType = (e: React.ChangeEvent<HTMLTextAreaElement>) => void;

type HandlePostClickType = () => Promise<void>;

type UpdateUserDataProps = {
	username				?: string,
	bio						?: string,
	profilePicExists		?: boolean,
	isComplete				: boolean
}



/**
 * Form to complete account.
 * 
 * This can be shown when a users signs in for the first time, or when new data is required.
 * 
 * @param firestoreDatabase - Firestore session.
 * @param currentUserDocSnap - current user Firestore doc snap.
 * @param setCurrentUserDocSnap - setter for current user Firestore doc snap.
 * @returns either a redirection to the users profile, or a form to complete the account.
 */
const useEditProfileFormHook: UseEditProfileFormHookType = (firestoreDatabase, currentUserDocSnap, setCurrentUserDocSnap) => {

	const userDataArr = currentUserDocSnap?.data();

	const [profilePicPath, setProfilePicPath] 				= useState('');
	const [profilePic, setProfilePic] 						= useState<File>();
	const [username, setUsername] 							= useState(userDataArr?.username || '');
	const [bio, setBio] 									= useState(userDataArr?.bio || '');
	const [response, setResponse] 							= useState([] as ResponseProps[]);
	const [isLoading, setIsLoading] 						= useState(false);



	/**
	 * Handle profilePic change.
	 * 
	 * @param e - event to track.
	 * @returns - nothing
	 */
	const handleProfilePicChange: HandleProfilePicChangeType = e => {
		const val = e.target.value;
		const files = e.target.files;
		setProfilePicPath(val);
		if (files) setProfilePic(files[0]);
	}



	/**
	 * Handle username change.
	 * 
	 * @param e - event to track.
	 * @returns - nothing
	 */
	const handleUsernameChange: HandleUsernameChangeType = e => {
		let val = e.target.value;
		val = val.toLocaleUpperCase();
		setUsername(val);
	}



	/**
	 * Handle bio change.
	 * 
	 * @param e - event to track.
	 * @returns - nothing
	 */
	const handleBioChange: HandleBioChangeType = e => {
		let val = e.target.value;
		setBio(val);
	}



	/**
	 * Handle post click.
	 * 
	 * Assemble the new post data and create a new doc in firestoreDatabase.
	 * 
	 * @returns - a promise.
	 */
	const handlePostClick: HandlePostClickType = async () => {

		if (!currentUserDocSnap) return;

		try {

			setIsLoading(true);

			// Check required inputs.
			let newResponse: ResponseProps[] = [];
			if (username.length < 4) newResponse.push({body: 'Usernames must be minmum 4 characters long.', type: 'error'});
			if (bio.length < 10) newResponse.push({body: 'Bio must be minmum 10 characters long.', type: 'error'});
			if (newResponse.length) {
				setResponse(newResponse);
				throw new Error('Input issue.');
			}

			// Handle profile pic.
			if (profilePicPath) {
				const storage = getStorage();
				// Remove old profile pic.
				// This can be removed, but it's nice to have full control.
				if (userDataArr?.profilePicExists) {
					try {
						const oldProfilePicRef = ref(storage, `users/${currentUserDocSnap.id}/avatar_400x400.webp`);
						await deleteObject(oldProfilePicRef);
					} catch (e) {
						console.error(`useEditProfileFormHook >> handlePostClick >> delete old pic >> ${e}`);
					}
				}
				// Upload profile pic if any.
				try {
					const newProfilePicRef = ref(storage, `users/${currentUserDocSnap.id}/avatar.webp`);
					await uploadBytes(newProfilePicRef, profilePic as File);
				} catch (e) {
					console.error(`useEditProfileFormHook >> handlePostClick >> ${e}`);
				}
			}

			const userQuery = query(collection(firestoreDatabase, "users"), where("username", "==", username), where("id", "!=", currentUserDocSnap.id));
			const userQuerySnap = await getDocs(userQuery);

			userQuerySnap.forEach((user: QueryDocumentSnapshot<DocumentData>) => {
				const foundUsername = user.data()['username'];
				if (foundUsername === username) {
					setResponse([{body: 'Username already in use.', type: 'error'}]);
					return;
				}
			})
				
			/**
			 * Update user doc.
			 */
			const updatedUserData: UpdateUserDataProps = {
				username,
				bio,
				'profilePicExists': profilePicPath ? true : false,
				'isComplete': true
			};
		
			await updateDoc(currentUserDocSnap.ref, updatedUserData);

			setResponse([{body: 'Saved.', type: 'success'}]);

			// Update data.
			const newCurrentUserDocSnap = await getDoc(currentUserDocSnap.ref);
			setCurrentUserDocSnap && setCurrentUserDocSnap(newCurrentUserDocSnap);

		} catch (e) {
			console.error(`useEditProfileFormHook >> handlePostClick >> ${e}`);
		} finally {
			setIsLoading(false);
		}

	}



	/**
	 * return hook content.
	 */
	return {
		handleProfilePicChange,
		profilePicPath,
		handleUsernameChange,
		username,
		handleBioChange,
		bio,
		handlePostClick,
		response,
		isLoading
	};
	
}

export default useEditProfileFormHook;

