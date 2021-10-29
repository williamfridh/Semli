import { GoogleAuthProvider, signInWithPopup, User } from '@firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from '@firebase/firestore';
import { useFirebase } from '../context/FirebaseContext';
import { NewUserDataProps, UpdateUserDataProps } from '../shared/types';



/**
 * Prints a button that triggers a Sign In With Google popup.
 * 
 * @returns a button.
 */
const LogInWithGoogleButton = () => {
	
	/**
	 * Setup.
	 */
	const { auth, firestoreDatabase, setCurrentUserDocSnap, setCurrentUserDocRef } = useFirebase();



	/**
	 * Check user.
	 * 
	 * @param currentUser - user to be checked..
	 */
	const checkUser = async (currentUser: User) => {

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
					lastActive: serverTimestamp()
				};

				await updateDoc(currentUserDocRef, updatedUserData);

			} catch (e) {
				console.error("Error adding document: ", e);
			}
			
		} else {

			/**
			 * Add new user doc.
			 */

			try {
			
				const newUserData: NewUserDataProps = {
					id: currentUser.uid,
					email: currentUser.email,
					created: serverTimestamp(),
					lastActive: serverTimestamp()
				};

				await setDoc(doc(firestoreDatabase, `users`, currentUser.uid), newUserData);

			} catch (e) {
				console.error("Error adding document: ", e);
			}

			

		}

		if (setCurrentUserDocRef) {
			setCurrentUserDocRef(currentUserDocRef);
		}

		if (setCurrentUserDocSnap) {
			setCurrentUserDocSnap(currentUserDocSnap);
		}

	}



	/**
	 * Trigger Google sign in popup.
	 */
	const loginWithGoogleClick = async () => {

		/**
		 * Create auth provider and let the user log in.
		 */
		const authProvider = new GoogleAuthProvider();

		await signInWithPopup(auth, authProvider)
			.then((result) => {
				// ?? Maybe store result in Firebase context?
				// This gives you a Google Access Token. You can use it to access the Google API.
				//const credential = GoogleAuthProvider.credentialFromResult(result);
				//const token = credential?.accessToken;
				// The signed-in user info.
				const currentUser = result.user;
				// ...

				checkUser(currentUser);

			}).catch((error) => {
				// !! Add error handling.
				// Handle Errors here.
				//const errorCode = error.code;
				//const errorMessage = error.message;
				// The email of the user's account used.
				//const email = error.email;
				// The AuthCredential type that was used.
				//const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});
			
	}



	/**
	 * Return main content.
	 */
	return(
		<div>
			<button onClick={loginWithGoogleClick}>Log In With Google</button>
		</div>
	);

}

export default LogInWithGoogleButton;

