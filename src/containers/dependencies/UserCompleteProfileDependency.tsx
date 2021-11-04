import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { FunctionComponent, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { logOut, useFirebase } from '../../context/FirebaseContext';
import { UserDependencyProps } from "../../shared/types";



/**
 * Check if the user has a completet account.
 * 
 * @param children - Automatixaly provided by React. Children of the element to be returned on a successful check.
 * @returns the children.
 */
const UserCompleteProfileDependency: FunctionComponent<UserDependencyProps> = (props): JSX.Element => {

	const { children } = props;
	const {
		auth,
		currentUser,
		firestoreDatabase,
		setCurrentUserDocSnap,
		setCurrentUserDocRef,
		firebaseIsloading,
		setFirebaseIsloading
	} = useFirebase();
	let { currentUserDocSnap } = useFirebase();
	const [isLoading, setIsloading] = useState(false);

	/**
	 * Check user.
	 * 
	 * @param currentUser - the currentUser object from the Firebase context.
	 */
	const checkUser = async (currentUser: User): Promise<void>=> {

		if ((currentUserDocSnap && currentUserDocSnap.exists()) || firebaseIsloading) {
			return;
		}

		setFirebaseIsloading && setFirebaseIsloading(true);
		
		try {

			/**
			 * Target, get and check if user doc exists.
			 */
			setIsloading(true);

			const currentUserDocRef = doc(firestoreDatabase, 'users', currentUser.uid);
			currentUserDocSnap = await getDoc(currentUserDocRef);

			setIsloading(false);

			setCurrentUserDocSnap && setCurrentUserDocSnap(currentUserDocSnap);
			setCurrentUserDocRef && setCurrentUserDocRef(currentUserDocRef);

			if (!currentUserDocSnap.exists()) {
				logOut(auth, setCurrentUserDocRef, setCurrentUserDocSnap, firebaseIsloading, setFirebaseIsloading);
			}

		} catch (e) {
			console.error(`UserCompleteProfileDependency >> checkUser >> ${e}`);
		}

		setFirebaseIsloading && setFirebaseIsloading(false);

	}

	/**
	 * Trigger use effect on different changes.
	 */
	useEffect(() => {
		if (currentUser) {
			checkUser(currentUser);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser, currentUserDocSnap]);

	if (currentUser) {

		if (isLoading || !currentUserDocSnap) {
			return <div style={{height: '100px', width: '100px', backgroundColor: 'green'}}>Is loading...</div>;
		}
		
		const userDataArr = currentUserDocSnap.data();

		if (userDataArr) {
			if (
				'username' in userDataArr === false ||
				'bio' in userDataArr === false
			) {
				return <Redirect to="/profile/complete" />;
			}
		}

	}

	return <div>{children}</div>;

}

export default UserCompleteProfileDependency;

