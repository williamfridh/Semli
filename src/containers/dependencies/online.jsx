import { useEffect } from "react";
import { Redirect } from "react-router";
import { useFirebase } from '../../context/FirebaseAuthContext';
import { auth } from "../../firebase";

/**
 * Check if the user meets the right criteria to see the content.
 * 
 * @param status - User status, either `online` or `offline`.
 * @param fallback - Url to fallback to if criteria aren't met. 
 * @param children - Automatixaly provided by React. Children of the element to be returned on a successful check.
 * @returns the children.
 */
const UserDependency = props => {

	/**
	 * Collect data.
	 */
	const { fallback, children } = props;
	let { status } = props;
	const { currentUser } = useFirebase();

	useEffect(() => {
		// !! Run user authentication.
	}, [currentUser]);

	/**
	 * Prevent error(s).
	 */
	status = status.toLowerCase();
	if (!status || ![`online`, `offline`].includes(status)) {
		console.warn(`UserDependency >> No status was choosen, default (offline) will be used.`);
		status = `offline`;
	} else {

	}
	if (!fallback) {
		console.warn(`UserDependency >> No fallback was choosen, default (/) will be used.`);
		fallback = `/`;
	}

	/**
	 * Setup.
	 */


	/**
	 * Select fate.
	 */
	if (
		(status === `online` && currentUser) ||
		(status === `offline` && !currentUser)
	) {
		// All good.
		return children;
	} else {
		// Something doesn't add up.
		return <Redirect to={fallback} />;
	}

}

export default UserDependency;

