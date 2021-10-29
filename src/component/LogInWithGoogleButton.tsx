import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { useFirebase } from '../context/FirebaseContext';



/**
 * Prints a button that triggers a Sign In With Google popup.
 * 
 * @returns a button.
 */
const LogInWithGoogleButton = () => {
	
	/**
	 * Setup.
	 */
	const { auth } = useFirebase();



	/**
	 * Handle click.
	 */
	const loginWithGoogleClick = () => {
		const authProvider = new GoogleAuthProvider();
		return signInWithPopup(auth, authProvider)
			.then((result) => {
				// ?? Maybe store result in Firebase context?
				// This gives you a Google Access Token. You can use it to access the Google API.
				//const credential = GoogleAuthProvider.credentialFromResult(result);
				//const token = credential?.accessToken;
				// The signed-in user info.
				//const user = result.user;
				// ...
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

