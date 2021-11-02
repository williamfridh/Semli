import { FunctionComponent } from "react";
import { Redirect } from "react-router";
import { useFirebase } from '../../context/FirebaseContext';
import { UserDependencyProps } from "../../shared/types";



/**
 * Check if user is online.
 * 
 * @param fallback - Url to fallback to if criteria aren't met. 
 * @param children - Automatixaly provided by React. Children of the element to be returned on a successful check.
 * @returns the children.
 */
const UserOnlineDependency: FunctionComponent<UserDependencyProps> = (props): JSX.Element => {

	const { fallback, children } = props;
	const { currentUser } = useFirebase();

	/**
	 * Use predecided fallback.
	 * 
	 * @returns the result of the user check.
	 */
	const triggerFallback = (): JSX.Element => {		
		if (fallback) {
			return <Redirect to={fallback} />;
		} else {
			return <div></div>; // Hide content.
		}
	}

	return currentUser ? <div>{children}</div> : triggerFallback();

}

export default UserOnlineDependency;

