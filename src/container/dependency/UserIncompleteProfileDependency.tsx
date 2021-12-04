import { FunctionComponent } from "react";
import { Redirect } from "react-router";
import {  useFirebase } from 'context/FirebaseContext';
import { UserDependencyProps } from "shared/types";
import Loading from "component/Loading";



/**
 * Check if the user has a completet account.
 * 
 * @param children - Automatixaly provided by React. Children of the element to be returned on a successful check.
 * @returns the children.
 */
const UserIncompleteProfileDependency: FunctionComponent<UserDependencyProps> = ({ children }): JSX.Element => {

	const {
		currentUserDocSnap,
		authInitilized
	} = useFirebase();

	const currentUserData = currentUserDocSnap?.data();

	if (!authInitilized) return <Loading />;

	if (currentUserDocSnap && currentUserData?.isComplete) return <Redirect to={`profile/${currentUserDocSnap.id}`} />;

	return <>{children}</>;

}

export default UserIncompleteProfileDependency;

