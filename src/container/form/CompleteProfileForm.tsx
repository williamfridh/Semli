import { getDoc, updateDoc, query, where, collection, getDocs, QueryDocumentSnapshot, DocumentData, DocumentReference } from "firebase/firestore";
import { FunctionComponent, useEffect, useState } from "react";
import { Redirect } from "react-router";
import ResponseList from "component/ResponseList";
import { ifProfileComplete, useFirebase } from "context/FirebaseContext";
import { ResponseProps, UpdateUserDataProps } from "shared/types";
import * as SC from 'component/StyledComponents';
import Loading from "component/Loading";
import { getStorage, ref, StorageReference, uploadBytes } from "@firebase/storage";

/**
 * Form to complete account.
 * 
 * This can be shown when a users signs in for the first time, or when new data is required.
 * 
 * @returns either a redirection to the users profile, or a form to complete the account.
 */
const CompleteProfileForm: FunctionComponent = (): JSX.Element => {

	const {
		currentUser,
		firestoreDatabase,
		currentUserDocSnap,
		setCurrentUserDocSnap
	} = useFirebase();

	const [profilePic, setProfilePic] 						= useState<File>();
	const [profilePicPath, setProfilePicPath] 				= useState('');
	const [profilePicExtension, setProfilePicExtension] 	= useState('');

	const [username, setUsername] 		= useState('');
	const [bio, setBio] 				= useState('');
	const [isLoading, setIsLoading] 	= useState(false);
	const [response, setResponse] 		= useState([] as ResponseProps[]);

	/**
	 * Handle profilePic change.
	 * 
	 * @param e - event to track.
	 * 
	 * @returns nothing.
	 */
	const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const val = e.target.value;
		const valArra = val.split('.');
		const files = e.target.files;
		setProfilePicPath(val);
		setProfilePicExtension(valArra[valArra.length-1]);
		if (files) setProfilePic(files[0]);
	}

	/**
	 * handle username content change.
	 * 
	 * @param e - event to track.
	 * 
	 * @returns nothing.
	 */
	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setUsername(e.target.value);
	}

	/**
	 * Handle bio change.
	 * 
	 * @param e - event to track.
	 * 
	 * @returns nothing.
	 */
	const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
		setBio(e.target.value);
	}

	/**
	 * Handle post click.
	 * 
	 * Assemble the new post data and create a new doc in firestoreDatabase.
	 * 
	 * @returns nothing.
	 */
	const handlePostClick = async (): Promise<void> => {

		if (!currentUser) return;

		try {

			setIsLoading(true);

			let newResponse: ResponseProps[] = [];

			/**
			 * Check input.
			 */
			if (username.length < 4) newResponse.push({body: 'Usernames must be minmum 4 characters long.', type: 'error'});
			if (bio.length < 10) newResponse.push({body: 'Bio must be minmum 10 characters long.', type: 'error'});
			if (newResponse.length) {
				setResponse(newResponse);
				setIsLoading(false);
				return;
			}

			/**
			 * Upload profile picture.
			 */
			let profilePicRef: StorageReference;
			if (profilePicPath) {
				const storage = getStorage();
				profilePicRef = ref(storage, `profile_picture/${currentUser.uid}.${profilePicExtension}`);
				await uploadBytes(profilePicRef, profilePic as File);
			}

			const usersQuery = query(collection(firestoreDatabase, "users"), where("username", "==", username), where("id", "!=", currentUser.uid));
			const usersSnap = await getDocs(usersQuery);

			usersSnap.forEach((user: QueryDocumentSnapshot<DocumentData>) => {
				const foundUsername = user.data()['username'];
				if (foundUsername === username)  {
					setResponse([{body: 'Username already in use.', type: 'error'}]);
					return;
				}
			});
	
			if (currentUserDocSnap && currentUserDocSnap.exists()) {
				
				/**
				 * Update user doc.
				 */
				try {
					
					const updatedUserData: UpdateUserDataProps = {
						username,
						bio,
						'profilePicExists': profilePicPath ? true : false,
						profilePicExtension
					};
		
					await updateDoc(currentUserDocSnap.ref as DocumentReference, updatedUserData);

					setResponse([{body: 'Saved.', type: 'success'}]);

					const newCurrentUserDocSnap = await getDoc(currentUserDocSnap.ref);
					setCurrentUserDocSnap && setCurrentUserDocSnap(newCurrentUserDocSnap);

				} catch (e) {
					console.error("Error adding document: ", e);
				}
				
			}

		} catch (e) {
			console.error(`CompleteProfileForm >> ${e}`);
		}

		setIsLoading(false);

	}

	/**
	 * Main content.
	 */
	return(
		<>
			<SC.Row><SC.Input type="file" onChange={handleProfilePicChange} value={profilePicPath} /></SC.Row>
			<SC.Row><SC.Input type="text" onChange={handleUsernameChange} value={username} placeholder="Username*" /></SC.Row>
			<SC.Row><SC.Textarea onChange={handleBioChange} value={bio} placeholder="I love cats, code, and...*" /></SC.Row>
			<SC.Row><SC.Button primary onClick={handlePostClick}><SC.ButtonText>Save</SC.ButtonText></SC.Button></SC.Row>
			{response && <SC.Row><ResponseList list={response} /></SC.Row>}
			{isLoading && <Loading/>}
		</>
	);
	
}

export default CompleteProfileForm;

