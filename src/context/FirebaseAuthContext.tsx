import { Auth, getAuth, onAuthStateChanged, User } from '@firebase/auth';
import { Firestore } from '@firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';


/**
 * Types & interfaces.
 */
export type useFirebaseProps = {
	auth: Auth,
	currentUser: User|null,
	db: Firestore
}



const FirebaseAuthContext = React.createContext <useFirebaseProps>({
	auth,
	currentUser: null,
	db
});

export const useFirebase = () => {
	return useContext(FirebaseAuthContext);
}

export const FirebaseProvider = (props: any) => {

	/**
	 * Setup.
	 */
	const { children } = props;

	const [currentUser, setCurrentUser] = useState<User|null>(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setCurrentUser(user);
		});

		return unsubscribe;
	}, []);

	const value: useFirebaseProps = {
		auth,
		currentUser,
		db
	};

	return(
		<FirebaseAuthContext.Provider value={value}>
			{children}
		</FirebaseAuthContext.Provider>
	);

}

