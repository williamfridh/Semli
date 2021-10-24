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



const FirebaseContext = React.createContext <useFirebaseProps>({
	auth,
	currentUser: null,
	db
});

export const useFirebase = () => {
	return useContext(FirebaseContext);
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
		<FirebaseContext.Provider value={value}>
			{children}
		</FirebaseContext.Provider>
	);

}

