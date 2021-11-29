import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import { FunctionComponent } from 'react';
import { useFirebase } from 'context/FirebaseContext';
import * as SC from './StyledComponents';
import { AiOutlineGoogle } from 'react-icons/ai';



/**
 * Types.
 */
type NewUserDataProps = {
	id				: string,
	email			: string|null
}



/**
 * Prints a button that triggers a Sign In With Google popup.
 * 
 * @returns a button.
 */
const LogInWithGoogleButton: FunctionComponent = (): JSX.Element => {
	
	const {
		auth,
		firestoreDatabase,
		setCurrentUserDocSnap
	} = useFirebase();

	/**
	 * Check user.
	 * 
	 * @param currentUser - user to be checked.
	 */
	const checkUser = async (currentUser: User): Promise<void> => {

		try {

			const currentUserDocRef 	= doc(firestoreDatabase, 'users', currentUser.uid);
			const currentUserDocSnap 	= await getDoc(currentUserDocRef);

			if (!currentUserDocSnap.exists()) {

				// Add new user doc.
				try {
				
					const newUserData: NewUserDataProps = {
						id			: currentUser.uid,
						email		: currentUser.email
					};

					await setDoc(doc(firestoreDatabase, `users`, currentUser.uid), newUserData);

				} catch (e) {
					console.error(`LogInWithGoogleButton >> checkUser >> ${e}`);
				}

			}

			// Update Firebase context.
			setCurrentUserDocSnap && setCurrentUserDocSnap(currentUserDocSnap);

		} catch (e) {
			console.error(`LogInWithGoogleButton >> ${e}`);
		}

	}

	/**
	 * Trigger Google sign in popup.
	 */
	const loginWithGoogleClick = async (): Promise<void> => {

		/**
		 * Create auth provider and let the user log in.
		 */
		const authProvider = new GoogleAuthProvider();

		try {
			const res = await signInWithPopup(auth, authProvider);
			checkUser(res.user);
		} catch(e) {
			console.error(`LogInWithGoogleButton >> loginWithGoogleClick >> ${e}`);
		};
			
	}
	
	return <SC.Button primary onClick={loginWithGoogleClick}><SC.ButtonIcon><AiOutlineGoogle /></SC.ButtonIcon><SC.ButtonText>Log In With Google</SC.ButtonText></SC.Button>;

}

export default LogInWithGoogleButton;

