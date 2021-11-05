import { signOut, User } from 'firebase/auth';
import { DocumentData, DocumentReference, DocumentSnapshot } from 'firebase/firestore';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { auth, firestoreDatabase } from '../firebase';
import { LogOutInterface, useFirebaseProps } from '../shared/types';



/**
 * Create context.
 */
const FirebaseContext = React.createContext<useFirebaseProps>({
	auth,
	currentUser				: null,
	currentUserDocRef		: null,
	setCurrentUserDocRef	: null,
	currentUserDocSnap		: null,
	setCurrentUserDocSnap	: null,
	firestoreDatabase,
	firebaseIsloading		: null,
	setFirebaseIsloading	: null
});



/**
 * Create a hook to the Firebase context.
 * 
 * @returns a context hook liked to the Firebase Context.
 */
export const useFirebase = (): useFirebaseProps => {
	return useContext(FirebaseContext);
}



/**
 * A Firebase provider to handle it's collected data.
 * 
 * @param props - children of the provider.
 * @returns an element that provides firebase.
 */
export const FirebaseProvider: FunctionComponent = ({ children }) => {

	const [firebaseIsloading, setFirebaseIsloading] 	= useState(false);
	const [currentUser, setCurrentUser] 				= useState<User|null>(null);
	const [currentUserDocSnap, setCurrentUserDocSnap] 	= useState<DocumentSnapshot<DocumentData>|null>(null);
	const [currentUserDocRef, setCurrentUserDocRef] 	= useState<DocumentReference<DocumentData>|null>(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentUser(user);
		});

		return unsubscribe;
	}, []);

	const newValue: useFirebaseProps = {
		auth,
		currentUser,
		currentUserDocRef,
		setCurrentUserDocRef,
		currentUserDocSnap,
		setCurrentUserDocSnap,
		firestoreDatabase,
		firebaseIsloading,
		setFirebaseIsloading
	};

	return <FirebaseContext.Provider value={newValue}>{children}</FirebaseContext.Provider>;

}



/**
 * Log out function to be used.
 * 
 * @param auth - the current auth object used by Firebase for authentication.
 * @param setCurrentUserDocSnap - a setter for current user doc snap.
 */
export const logOut: LogOutInterface = async ( auth, setCurrentUserDocRef, setCurrentUserDocSnap, firebaseIsloading, setFirebaseIsloading ) => {
	setFirebaseIsloading && setFirebaseIsloading(true);
	try {
		// Do not change this order!
		await signOut(auth);
		setCurrentUserDocSnap && setCurrentUserDocSnap(null);
		setCurrentUserDocRef && setCurrentUserDocRef(null);
	} catch (err) {
		console.log("Logout: failed");
	}
	setFirebaseIsloading && setFirebaseIsloading(false);
}

