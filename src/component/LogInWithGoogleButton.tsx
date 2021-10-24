import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { useFirebase, useFirebaseProps } from '../context/FirebaseAuthContext';



/**
 * Prints a button that triggers a Sign In With Google popup.
 * 
 * @returns a button.
 */
const LogInWithGoogleButton = () => {
	
	const { auth } = useFirebase();

	/**
	 * Handle click.
	 */
	const handleClick = () => {
		const authProvider = new GoogleAuthProvider();
		return signInWithPopup(auth, authProvider)
			.then((result: any) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;
				// The signed-in user info.
				const user = result.user;
				// ...
			}).catch((error: any) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	}

	/**
	 * Return main content.
	 */
	return(
		<div>
			<button onClick={handleClick}>Log In With Google</button>
		</div>
	);
}

export default LogInWithGoogleButton;

