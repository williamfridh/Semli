import { FunctionComponent } from "react";
import { Redirect } from "react-router";
import {  ifProfileComplete, useFirebase } from 'context/FirebaseContext';
import { UserDependencyProps } from "shared/types";
import Loading from "component/Loading";



/**
 * Check if the user has a completet account.
 * 
 * @param children - Automatixaly provided by React. Children of the element to be returned on a successful check.
 * @returns the children.
 */
const UserInCompleteProfileDependency: FunctionComponent<UserDependencyProps> = (props): JSX.Element => {

	const { children } = props;
	const {
		currentUserDocSnap,
		authInitilized
	} = useFirebase();

	if (!authInitilized) {
		return <Loading />;
	}

	if (currentUserDocSnap && ifProfileComplete(currentUserDocSnap)) {
		return <Redirect to={`profile/${currentUserDocSnap.id}`} />;
	}

	return <>{children}</>;

}

export default UserInCompleteProfileDependency;

