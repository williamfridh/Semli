import { FunctionComponent, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useFirebase } from 'context/FirebaseContext';
import { UserDependencyProps } from "shared/types";
import Loading from "component/Loading";
import { getDoc } from "@firebase/firestore";



/**
 * Check if user is online.
 * 
 * @param fallback - Url to fallback to if criteria aren't met. 
 * @param children - Automatixaly provided by React. Children of the element to be returned on a successful check.
 * @returns the children.
 */
const UserOnlineDependency: FunctionComponent<UserDependencyProps> = (props): JSX.Element => {

	const { fallback, children } = props;
	const { currentUser, authInitilized, currentUserDocSnap, setCurrentUserDocSnap, currentUserDocRef } = useFirebase();
	const [isLoading, setIsLoading] = useState(false);

	/**
	 * Use predecided fallback.
	 * 
	 * @returns the result of the user check.
	 */
	const triggerFallback = (): JSX.Element => {
		if (fallback) {
			return <Redirect to={fallback} />;
		} else {
			return <></>; // Hide content.
		}
	}

	useEffect(() => {

		let isMounted = true;

		if (!currentUserDocSnap) {
			console.log(`UserOnlineDependency >> useEffect >> Running...`);
			setIsLoading(true);
			currentUserDocRef && getDoc(currentUserDocRef).then(res => {
				if (!isMounted) {
					console.log(`UserOnlineDependency >> useEffect >> Stoped`);
					return;
				}
				setCurrentUserDocSnap && setCurrentUserDocSnap(res);
				setIsLoading(false);
				console.log(`UserOnlineDependency >> useEffect >> Success`);
			}).catch(e => {
				console.log(`UserOnlineDependency >> useEffect >> ${e}`);
			});
		}

		return()=>{
			isMounted = false;
			console.log(`UserOnlineDependency >> useEffect >> Dismounted`);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUserDocRef]);

	if (!authInitilized || isLoading) {
		return <Loading />;
	} else if (currentUser) {
		return <>{children}</>;
	} else {
		return triggerFallback();
	}

}

export default UserOnlineDependency;

