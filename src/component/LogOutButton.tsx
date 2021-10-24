import { signOut } from "@firebase/auth";
import { useFirebase } from "../context/FirebaseAuthContext";


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
	const handleClick = () => {
		return signOut(auth).then(() => {
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
			<button onClick={handleClick}>Logout</button>
		</div>
	);
}

export default LogOutButton;

