import { Auth, User } from '@firebase/auth';
import { Firestore } from '@firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';



/**
 * Types.
 */
type useFirebaseProps = {
	auth: Auth,
	currentUser: User|null,
	db: Firestore
}
type FirebaseProviderProps = {
	children: JSX.Element
}



/**
 * Create context.
 */
const FirebaseContext = React.createContext <useFirebaseProps>({
	auth,
	currentUser: null,
	db
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
		db
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

