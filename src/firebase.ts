import {initializeApp} from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseApp = initializeApp({
	apiKey				: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain			: process.env.REACT_APP_AUTH_DOMAIN,
	projectId			: process.env.REACT_APP_PROJECT_ID,
	storageBucket		: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId	: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId				: process.env.REACT_APP_FIREBASREACT_APP_APP_IDE_API_KEY,
	measurementId		: process.env.REACT_APP_MEASUREMENT_ID
});
export default firebaseApp;



/**
 * Prepare Firebase authentication and Firestore (database).
 * 
 * These values are passed to the Firebase Context
 * to become accecible all over the app. This can
 * be done by imporing the firestoreDatabase and auth in each file,
 * but this leads to issues with the hook useEffect.
 */
export const firestoreDatabase = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

