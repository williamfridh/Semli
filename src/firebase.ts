/**
 * Import required files for seting up Firebase.
 */
import {initializeApp} from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"



/**
 * Initilize Firebase app.
 */
const app = initializeApp({
	apiKey: "AIzaSyBwNDnIz6a_vIxaDAG_I2rhwZvw_Evk_J8",
	authDomain: "semli-38800.firebaseapp.com",
	projectId: "semli-38800",
	storageBucket: "semli-38800.appspot.com",
	messagingSenderId: "565706382715",
	appId: "1:565706382715:web:9d88dd3d5d658038fa71de",
	measurementId: "G-D40F9TCR8Q"
});



/**
 * Prepare Firebase authentication and Firestore (database).
 * These alongside the
 * 
 * These values are passed to the Firebase Context
 * to become accecible all over the app. This can
 * be done by imporing the db and auth in each file,
 * but this leads to issues with the hook useEffect.
 */
export const db = getFirestore(app);
export const auth = getAuth(app);



/**
 * Export Firebase app.
 */
export default app;

