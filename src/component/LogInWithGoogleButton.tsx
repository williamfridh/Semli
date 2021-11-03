import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { FunctionComponent } from 'react';
import { useFirebase } from '../context/FirebaseContext';
import { NewUserDataProps, UpdateUserDataProps } from '../shared/types';



/**
 * Prints a button that triggers a Sign In With Google popup.
 * 
 * @returns a button.
 */
const LogInWithGoogleButton: FunctionComponent = (): JSX.Element => {
	
	const {
		auth,
		firestoreDatabase,
		setCurrentUserDocSnap,
		setCurrentUserDocRef,
		firebaseIsloading,
		setFirebaseIsloading
	} = useFirebase();

	/**
	 * Check user.
	 * 
	 * @param currentUser - user to be checked.
	 */
	const checkUser = async (currentUser: User): Promise<void> => {

		setFirebaseIsloading && setFirebaseIsloading(true);

		try {

			const currentUserDocRef 	= doc(firestoreDatabase, 'users', currentUser.uid);
			const currentUserDocSnap 	= await getDoc(currentUserDocRef);
			const currentUserDocExists 	= currentUserDocSnap.exists();

			if (currentUserDocExists) {
				
				// Update user doc.
				try {
				
					const updatedUserData: UpdateUserDataProps = {
						lastActive: serverTimestamp()
					};

					await updateDoc(currentUserDocRef, updatedUserData);

				} catch (e) {
					console.error("Error adding document: ", e);
				}
				
			} else {

				// Add new user doc.
				try {
				
					const newUserData: NewUserDataProps = {
						id			: currentUser.uid,
						email		: currentUser.email,
						created		: serverTimestamp(),
						lastActive	: serverTimestamp()
					};

					await setDoc(doc(firestoreDatabase, `users`, currentUser.uid), newUserData);

				} catch (e) {
					console.error("Error adding document: ", e);
				}

				

			}

			// Update Firebase context.
			setCurrentUserDocRef 	&& setCurrentUserDocRef(currentUserDocRef);
			setCurrentUserDocSnap 	&& setCurrentUserDocSnap(currentUserDocSnap);

		} catch (e) {
			console.error(`LogInWithGoogleButton >> ${e}`);
		}

		setFirebaseIsloading && setFirebaseIsloading(false);

	}

	/**
	 * Trigger Google sign in popup.
	 */
	const loginWithGoogleClick = (): void => {

		/**
		 * Create auth provider and let the user log in.
		 */
		const authProvider = new GoogleAuthProvider();

		signInWithPopup(auth, authProvider)
			.then((result) => {
				checkUser(result.user);
			}).catch((error) => {
				console.error(`loginWithGoogleClick >> ${error}`);
			});
			
	}
	
	return <div><button onClick={loginWithGoogleClick}>Log In With Google</button></div>;

}

export default LogInWithGoogleButton;

