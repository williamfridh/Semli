import { FunctionComponent } from "react";
import { logOut, useFirebase } from "context/FirebaseContext";
import * as SC from './StyledComponents';



/**
 * Prints a button that signs out the user.
 * 
 * @returns a button.
 */
const LogOutButton: FunctionComponent = (): JSX.Element => {

	const {
		auth,
		setCurrentUserDocSnap,
		setCurrentUserDocRef,
		firebaseIsloading,
		setFirebaseIsloading
	} = useFirebase();

	/**
	 * Handle logout button click.
	 * 
	 * @returns nothing. 
	 */
	const handleLogoutClick = (): void => {
		logOut(auth, setCurrentUserDocRef, setCurrentUserDocSnap, firebaseIsloading, setFirebaseIsloading);
	}

	return <SC.Button onClick={handleLogoutClick}><SC.ButtonText>Logout</SC.ButtonText></SC.Button>;
}

export default LogOutButton;

