import { collection, doc, DocumentData, getDoc, getDocs, query, QueryDocumentSnapshot, updateDoc, where } from "firebase/firestore";
import { FunctionComponent, useState } from "react";
import ResponseList from "../../component/ResponseList";
import { useFirebase } from "../../context/FirebaseContext";
import { ResponseProps, UpdateUserDataProps } from "../../shared/types";

/**
 * Form to complete account.
 * 
 * This can be shown when a users signs in for the first time, or when new data is required.
 * 
 * @returns either a redirection to the users profile, or a form to complete the account.
 */
const EditProfileForm: FunctionComponent = (): JSX.Element => {

	const { currentUser, firestoreDatabase, currentUserDocSnap, setCurrentUserDocSnap } = useFirebase();

	const userDataArr = currentUserDocSnap?.data();

	const [username, setUsername] 	= useState(userDataArr?.username);
	const [bio, setBio] 			= useState(userDataArr?.bio);
	const [response, setResponse] 	= useState([] as ResponseProps[]);

	/**
	 * handle username content change.
	 * 
	 * @param e - event to track.
	 */
	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setUsername(e.target.value);
	}

	/**
	 * Handle bio change.
	 * 
	 * @param e - event to track.
	 */
	const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
		setBio(e.target.value);
	}

	/**
	 * Handle post click.
	 * 
	 * Assemble the new post data and create a new doc in firestoreDatabase.
	 */
	const handlePostClick = async () => {

		if (!currentUser) {
			return;
		}

		let newResponse: ResponseProps[] = [];

		/**
		 * Check input.
		 */
		if (username.length < 4) {
			newResponse.push({body: 'Usernames must be minmum 4 characters long.', type: 'error'});
			setResponse(newResponse);
		}
		if (bio.length < 10) {
			newResponse.push({body: 'Bio must be minmum 10 characters long.', type: 'error'});
			setResponse(newResponse);
		}
		if (newResponse.length) {
			setResponse(newResponse);
			return;
		}

		const q = query(collection(firestoreDatabase, "users"), where("username", "==", username), where("id", "!=", currentUser.uid));
		const qSnapshop = await getDocs(q);

		qSnapshop.forEach((obj: QueryDocumentSnapshot<DocumentData>) => {
			const foundUsername = obj.data()['username'];
			if (foundUsername === username) {
				setResponse([{body: 'Username already in use.', type: 'error'}]);
				return;
			}
		})

		/**
		 * Target, get and check if user doc exists.
		 */
		 const currentUserDocRef = doc(firestoreDatabase, 'users', currentUser.uid);
		 const currentUserDocSnap = await getDoc(currentUserDocRef);
		 const currentUserDocExists = currentUserDocSnap.exists();
 
		 if (currentUserDocExists) {
			 
			 /**
			  * Update user doc.
			  */
			try {
				
				const updatedUserData: UpdateUserDataProps = {
					username,
					bio
				};
	
				await updateDoc(currentUserDocRef, updatedUserData);

				setResponse([{body: 'Saved.', type: 'success'}]);

				// Update data.
				const currentUserDocSnap = await getDoc(currentUserDocRef);
				setCurrentUserDocSnap && setCurrentUserDocSnap(currentUserDocSnap);

			} catch (e) {
				console.error("Error adding document: ", e);
			}
			 
		 }

	}

	return(
		<div className="form">
			<input type="text" onChange={handleUsernameChange} value={username} />
			<textarea onChange={handleBioChange} value={bio} />
			<button onClick={handlePostClick}>Continue</button>
			{response && <ResponseList list={response} />}
		</div>
	);
	
}

export default EditProfileForm;

