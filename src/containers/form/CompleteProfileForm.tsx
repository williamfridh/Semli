import { doc, getDoc, updateDoc, query, where, collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { Redirect } from "react-router";
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
const CompleteProfileForm = () => {

	/**
	 * Setup.
	 */
	const { currentUser, firestoreDatabase, setCurrentUserDocSnap } = useFirebase();
	const [username, setUsername] = useState('');
	const [bio, setBio] = useState('');
	const [isComplete, setIsComplete] = useState(false);
	const [response, setResponse] = useState<ResponseProps[]>([]);



	/**
	 * handle username content change.
	 * 
	 * @param e - event to track.
	 */
	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const val = e.target.value;
		setUsername(val);
	}



	/**
	 * Handle bio change.
	 * 
	 * @param e - event to track.
	 */
	const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
		const val = e.target.value;
		setBio(val);
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
		if (newResponse.length > 0) {
			setResponse(newResponse);
			return;
		}

		const q = query(collection(firestoreDatabase, "users"), where("username", "==", username), where("id", "!=", currentUser.uid));
		const qSnapshop = await getDocs(q);

		qSnapshop.forEach((obj: any) => {
			const foundUsername = obj.data()['username'];
			if (foundUsername === username) {
				newResponse.push({body: 'Username already in use.', type: 'error'});
			}
		})

		if (newResponse.length > 0) {
			setResponse(newResponse);
			return;
		}



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

				setIsComplete(true);

				// Update data.
				const currentUserDocSnap = await getDoc(currentUserDocRef);
				if (setCurrentUserDocSnap) {
					setCurrentUserDocSnap(currentUserDocSnap);
				}

			} catch (e) {
				console.error("Error adding document: ", e);
			}
			 
		 }

	}



	/**
	 * Redirect the user to his/her profile.
	 */
	if (isComplete && currentUser) {
		return <Redirect to={`/profile/${currentUser.uid}`} />;
	}



	/**
	 * Main content.
	 */
	return(
		<div className="form">
			<input type="text" onChange={handleUsernameChange} value={username} />
			<textarea onChange={handleBioChange} value={bio} />
			<button onClick={handlePostClick}>Continue</button>
			<ResponseList list={response} />
		</div>
	);
	
}

export default CompleteProfileForm;

