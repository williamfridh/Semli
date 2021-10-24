

import {initializeApp} from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const app = initializeApp({
	apiKey: "AIzaSyBwNDnIz6a_vIxaDAG_I2rhwZvw_Evk_J8",
	authDomain: "semli-38800.firebaseapp.com",
	projectId: "semli-38800",
	storageBucket: "semli-38800.appspot.com",
	messagingSenderId: "565706382715",
	appId: "1:565706382715:web:9d88dd3d5d658038fa71de",
	measurementId: "G-D40F9TCR8Q"
});

export const db = getFirestore();
export const auth = getAuth();
export default app;

