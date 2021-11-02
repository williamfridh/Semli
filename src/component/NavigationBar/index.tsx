import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { useFirebase } from '../../context/FirebaseContext';
import menuOptions from '../../json/menuOptions.json';
import { MenuObject } from '../../shared/types';



/**
 * Create a navigation bar element.
 * 
 * This component prints items from a JSON file.
 * 
 * @returns a navigation bar.
 */
const NavigationBar: FunctionComponent = (): JSX.Element => {

	const { currentUserDocSnap, currentUser } = useFirebase();

	const navButtons = menuOptions.map((menuOpt: MenuObject, key: number): React.ReactNode => {

		const { text } 				= menuOpt;
		let { url, userStatus } 	= menuOpt;

		userStatus = userStatus.toLowerCase();
		url = currentUser ? url.replace(`:currentUserUid`, currentUser.uid) : url;

		let displayOrHide: boolean;
		switch(userStatus) {
			case('online'):
				displayOrHide = currentUserDocSnap ? true : false;
				break;
			case('offline'):
				displayOrHide = currentUserDocSnap ? false : true;
				break;
			case('any'):
				displayOrHide = true;
				break;
			default:
				console.warn(`NavigationBar >> an object with userStatus that did't match with "online", "offline", or "any" was detected. It wont be printed.`);
				displayOrHide = false;
		}

		return displayOrHide && <NavLink to={url} style={{ textDecoration: 'none' }} key={key}>{text}</NavLink>;

	});

	return <div className="navigation-bar">{navButtons}</div>;
}

export default NavigationBar;

