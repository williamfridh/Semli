import { Redirect } from "react-router";
import { useFirebase } from '../../context/FirebaseContext';
import { UserDependencyProps } from "../../shared/types";



/**
 * Check if the user is offline.
 * 
 * @param fallback - Url to fallback to if criteria aren't met. 
 * @param children - Automatixaly provided by React. Children of the element to be returned on a successful check.
 * @returns the children.
 */
const UserOfflineDependency = (props: UserDependencyProps) => {

	/**
	 * Collect data.
	 */
	const { fallback, children } = props;
	const { currentUser, currentUserDocSnap } = useFirebase();

	/**
	 * Use predecided fallback.
	 * 
	 * @returns the result of the user check.
	 */
	const triggerFallback = () => {		
		if (fallback) {
			return <Redirect to={fallback} />;
		} else {
			return null; // Hide content.
		}
	}

	if (currentUser || currentUserDocSnap) {
		return triggerFallback();
	}

	return children;

}

export default UserOfflineDependency;

