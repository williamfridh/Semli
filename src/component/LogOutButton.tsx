import { logOut, useFirebase } from "../context/FirebaseContext";



/**
 * Prints a button that signs out the user.
 * 
 * @returns a button.
 */
const LogOutButton = () => {

	/**
	 * Setup.
	 */
	
	const { auth, setCurrentUserDocSnap, setCurrentUserDocRef } = useFirebase();



	/**
	 * Handle logout button click.
	 * 
	 * @returns nothing. 
	 */
	const handleLogoutClick = () => {
		logOut(auth, setCurrentUserDocRef, setCurrentUserDocSnap);
	}



	/**
	 * Return main content.
	 */
	return(
		<div>
			<button onClick={handleLogoutClick}>Logout</button>
		</div>
	);
}

export default LogOutButton;

