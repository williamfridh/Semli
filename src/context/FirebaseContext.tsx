import { Auth, signOut, User } from '@firebase/auth';
import { DocumentData, DocumentReference, DocumentSnapshot, Firestore } from '@firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { auth, firestoreDatabase } from '../firebase';



/**
 * Types.
 * 
 * To check if a user is online (on client side), check if currentUserDocSnap exists.
 */
type useFirebaseProps = {
	auth: Auth,
	currentUser: User|null,
	currentUserDocRef: DocumentReference<DocumentData>|null,
	setCurrentUserDocRef: React.Dispatch<React.SetStateAction<DocumentReference<DocumentData> | null>>|null,
	currentUserDocSnap: DocumentSnapshot<DocumentData>|null,
	setCurrentUserDocSnap: React.Dispatch<React.SetStateAction<DocumentSnapshot<DocumentData> | null>>|null,
	firestoreDatabase: Firestore
}
type FirebaseProviderProps = {
	children: JSX.Element
}



/**
 * Create context.
 */
const FirebaseContext = React.createContext<useFirebaseProps>({
	auth,
	currentUser: null,
	currentUserDocRef: null,
	setCurrentUserDocRef: null,
	currentUserDocSnap: null,
	setCurrentUserDocSnap: null,
	firestoreDatabase
});



/**
 * Create a hook to the Firebase context.
 * 
 * @returns a context hook liked to the Firebase Context.
 */
export const useFirebase = () => {
	return useContext(FirebaseContext);
}



/**
 * A Firebase provider to handle it's collected data.
 * 
 * @param props - children of the provider.
 * @returns an element that provides firebase.
 */
export const FirebaseProvider = (props: FirebaseProviderProps) => {

	/**
	 * Setup.
	 */
	const { children } = props;
	const [currentUser, setCurrentUser] = useState<User|null>(null);
	const [currentUserDocSnap, setCurrentUserDocSnap] = useState<DocumentSnapshot<DocumentData>|null>(null);
	const [currentUserDocRef, setCurrentUserDocRef] = useState<DocumentReference<DocumentData>|null>(null);



	/**
	 * 
	 */
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentUser(user);
		});

		return unsubscribe;
	}, []);



	/**
	 * Create new values.
	 */
	const value: useFirebaseProps = {
		auth,
		currentUser,
		currentUserDocRef,
		setCurrentUserDocRef,
		currentUserDocSnap,
		setCurrentUserDocSnap,
		firestoreDatabase
	};



	/**
	 * Return contect element with the values.
	 */
	return(
		<FirebaseContext.Provider value={value}>
			{children}
		</FirebaseContext.Provider>
	);

}



/**
 * Log out function to be used.
 * 
 * @param auth - the current auth object used by Firebase for authentication.
 * @param setCurrentUserDocSnap - a setter for current user doc snap.
 */
export const logOut = async (
	auth: Auth,
	setCurrentUserDocRef: React.Dispatch<React.SetStateAction<DocumentReference<DocumentData> | null>>|null,
	setCurrentUserDocSnap: React.Dispatch<React.SetStateAction<DocumentSnapshot<DocumentData> | null>>|null
	) => {
	try {
		await signOut(auth);
		// Sign-out successful.
		if (setCurrentUserDocSnap) {
			setCurrentUserDocSnap(null);
		}
		if (setCurrentUserDocRef) {
			setCurrentUserDocRef(null);
		}
	} catch (err) {
		// An error happened.
		console.log("Logout: failed");
	}
}

