import { signOut } from "@firebase/auth";
import { useFirebase } from "../context/FirebaseContext";



/**
 * Prints a button that signs out the user.
 * 
 * @returns a button.
 */
const LogOutButton = () => {

	/**
	 * Setup.
	 */
	
	const { auth } = useFirebase();



	/**
	 * Handle logout button click.
	 * 
	 * @returns nothing. 
	 */
	const handleLogoutClick = () => {
		signOut(auth).then(() => {
			// Sign-out successful.
			console.log("Logout: success");
		}).catch((error) => {
			// An error happened.
			console.log("Logout: failed");
		});
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

