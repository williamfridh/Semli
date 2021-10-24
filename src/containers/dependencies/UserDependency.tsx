import { Redirect } from "react-router";
import { useFirebase } from '../../context/FirebaseContext';



/**
 * Types.
 */
type UserDependencyProps = {
	fallback	: string,
	children	: JSX.Element,
	status		: 'online'|'offline'
}



/**
 * Check if the user meets the right criteria to see the content.
 * 
 * @param status - User status, either `online` or `offline`.
 * @param fallback - Url to fallback to if criteria aren't met. 
 * @param children - Automatixaly provided by React. Children of the element to be returned on a successful check.
 * @returns the children.
 */
const UserDependency = (props: UserDependencyProps) => {

	/**
	 * Collect data.
	 */
	const { fallback, children } = props;
	let { status } = props;
	const { currentUser } = useFirebase();


	
	/**
	 * Select fate depending on status and current user.
	 */
	if (
		(status === `online` && currentUser) ||
		(status === `offline` && !currentUser)
	) {
		// All good.
		return children;
	} else {
		// Something doesn't add up...
		return <Redirect to={fallback} />;
	}

}

export default UserDependency;

