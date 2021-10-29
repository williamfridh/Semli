import { User } from "@firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { logOut, useFirebase } from '../../context/FirebaseContext';
import { UserDependencyProps } from "../../shared/types";



/**
 * Check if the user has a completet account.
 * 
 * @param children - Automatixaly provided by React. Children of the element to be returned on a successful check.
 * @returns the children.
 */
const UserCompleteProfileDependency = (props: UserDependencyProps) => {

	/**
	 * Collect data.
	 */
	const { children } = props;
	let { auth, currentUser, firestoreDatabase, setCurrentUserDocSnap, setCurrentUserDocRef } = useFirebase();
	let { currentUserDocSnap } = useFirebase();
	const [isLoading, setIsloading] = useState(false);
	const currentUserDocSnapPreExists = currentUserDocSnap ? true : false;



	/**
	 * Check user.
	 * 
	 * @param currentUser - the currentUser object from the Firebase context.
	 */
	const checkUser = async (currentUser: User) => {

		/**
		 * Target, get and check if user doc exists.
		 */
		if (!currentUserDocSnap || !currentUserDocSnap.exists()) {
			setIsloading(true);
			const currentUserDocRef = doc(firestoreDatabase, 'users', currentUser.uid);
			currentUserDocSnap = await getDoc(currentUserDocRef);
			setIsloading(false);
			if (setCurrentUserDocSnap) {
				setCurrentUserDocSnap(currentUserDocSnap);
			}
			if (setCurrentUserDocRef) {
				setCurrentUserDocRef(currentUserDocRef);
			}
		}
	 
		if (currentUserDocSnapPreExists && !currentUserDocSnap.exists()) {
			logOut(auth, setCurrentUserDocRef, setCurrentUserDocSnap);
		}

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



	/**
	 * Decide fate.
	 */
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

	return children;

}

export default UserCompleteProfileDependency;

