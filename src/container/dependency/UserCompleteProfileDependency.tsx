import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { FunctionComponent, useEffect } from "react";
import { Redirect } from "react-router";
import { logOut, useFirebase } from 'context/FirebaseContext';
import { UserDependencyProps } from "shared/types";
import Loading from "component/Loading";



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

	/**
	 * Trigger use effect on different changes.
	 */
	useEffect(() => {

		/**
		 * Check user.
		 * 
		 * @param currentUser - the currentUser object from the Firebase context.
		 */
		const checkUser = async (currentUser: User): Promise<void>=> {

			if ((currentUserDocSnap && currentUserDocSnap.exists()) || firebaseIsloading) {
				return;
			}

			console.log(`UserCompleteProfileDependency >> useEffect >> checkUser >> Running`);

			setFirebaseIsloading && setFirebaseIsloading(true);
			
			try {

				/**
				 * Target, get and check if user doc exists.
				 */

				const currentUserDocRef = doc(firestoreDatabase, 'users', currentUser.uid);
				const currentUserDocSnapTemp = await getDoc(currentUserDocRef);

				setCurrentUserDocSnap && setCurrentUserDocSnap(currentUserDocSnapTemp);
				setCurrentUserDocRef && setCurrentUserDocRef(currentUserDocRef);

				if (!currentUserDocSnapTemp.exists()) {
					logOut(auth, setCurrentUserDocRef, setCurrentUserDocSnap, firebaseIsloading, setFirebaseIsloading);
				}

			} catch (e) {
				console.error(`UserCompleteProfileDependency >> useEffect >> checkUser >> ${e}`);
			}

			setFirebaseIsloading && setFirebaseIsloading(false);

		}

		if (currentUser && !currentUserDocSnap) {
			checkUser(currentUser);
		}

		return() => {
			console.log(`UserCompleteProfileDependency >> useEffect >> Dismounted`);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser, currentUserDocSnap]);

	if (currentUser) {

		if (firebaseIsloading) {
			return <Loading />;
		}
		
		const userDataArr = currentUserDocSnap?.data();

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

