import { signOut, User } from 'firebase/auth';
import { DocumentData, DocumentReference, DocumentSnapshot, doc, getDoc } from '@firebase/firestore';
import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { auth, firestoreDatabase } from 'firebase';
import { LogOutInterface, useFirebaseProps } from 'shared/types';



/**
 * Create context.
 */
const FirebaseContext = React.createContext<useFirebaseProps>({
	auth,
	authInitilized			: false,
	currentUser				: null,
	currentUserDocSnap		: null,
	setCurrentUserDocSnap	: null,
	firestoreDatabase
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

	const [authInitilized, setAuthInitilized] 			= useState(false);
	const [currentUser, setCurrentUser] 				= useState<User|null>(null);
	const [currentUserDocSnap, setCurrentUserDocSnap] 	= useState<DocumentSnapshot<DocumentData>|null>(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentUser(user);
			if (user) {
				console.log(`FirebaseProvider >> useEffect >> Running...`);
				const currentUserDocRef = doc(firestoreDatabase, 'users', user.uid);
				getDoc(currentUserDocRef).then(cureUserDocSnap => {
					setCurrentUserDocSnap(cureUserDocSnap);
					setAuthInitilized(true);
					console.log(`FirebaseProvider >> useEffect >> Success`);
				}).catch(e => {
					console.warn(`FirebaseProvider >> useEffect >> ${e}`);
				});
			} else {
				setAuthInitilized(true);
			}
		});

		return unsubscribe;
	}, []);

	const newValue: useFirebaseProps = {
		auth,
		authInitilized,
		currentUser,
		currentUserDocSnap,
		setCurrentUserDocSnap,
		firestoreDatabase
	};

	return <FirebaseContext.Provider value={newValue}>{children}</FirebaseContext.Provider>;

}



/**
 * Log out function to be used.
 * 
 * @param auth - the current auth object used by Firebase for authentication.
 * @param setCurrentUserDocSnap - a setter for current user doc snap.
 */
export const logOut: LogOutInterface = async ( auth ) => {
	try {
		// Do not change this order!
		await signOut(auth);
	} catch (err) {
		console.log("Logout: failed");
	}
}


export const ifProfileComplete = (currentUserDocSnap: any)  => {
	if (currentUserDocSnap) {
		const currentUserSnapData = currentUserDocSnap.data();
		if (
			!currentUserSnapData ||
			'username' in currentUserSnapData === false ||
			'bio' in currentUserSnapData === false
		) {
			return false;
		} else {
			return true;
		}
	}
}

