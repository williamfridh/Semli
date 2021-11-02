import { FunctionComponent } from "react";
import { logOut, useFirebase } from "../context/FirebaseContext";



/**
 * Prints a button that signs out the user.
 * 
 * @returns a button.
 */
const LogOutButton: FunctionComponent = (): JSX.Element => {

	const { auth, setCurrentUserDocSnap, setCurrentUserDocRef } = useFirebase();

	/**
	 * Handle logout button click.
	 * 
	 * @returns nothing. 
	 */
	const handleLogoutClick = (): void => {
		logOut(auth, setCurrentUserDocRef, setCurrentUserDocSnap);
	}

	return <div><button onClick={handleLogoutClick}>Logout</button></div>;
}

export default LogOutButton;

