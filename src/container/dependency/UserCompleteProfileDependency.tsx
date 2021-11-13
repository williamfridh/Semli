import { FunctionComponent } from "react";
import { Redirect } from "react-router";
import {  ifProfileComplete, useFirebase } from 'context/FirebaseContext';
import { UserDependencyProps } from "shared/types";



/**
 * Check if the user has a completet account.
 * 
 * @param children - Automatixaly provided by React. Children of the element to be returned on a successful check.
 * @returns the children.
 */
const UserCompleteProfileDependency: FunctionComponent<UserDependencyProps> = (props): JSX.Element => {

	const { children } = props;
	const {
		currentUserDocSnap
	} = useFirebase();

	if (!ifProfileComplete(currentUserDocSnap)) {
		return <Redirect to="/profile/complete" />;
	}

	return <div>{children}</div>;

}

export default UserCompleteProfileDependency;

