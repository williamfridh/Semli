import { NavLink } from 'react-router-dom';
import { useFirebase } from '../../context/FirebaseContext';
import menuOptions from '../../json/menuOptions.json';



/**
 * Types.
 * 
 * !! userStatus should be 'online'|'offline'|'any'
 */
type MenuObject = {
	text		: string,
	url			: string,
	userStatus	: string
}



/**
 * Create a navigation bar element.
 * 
 * This component prints items from a JSON file.
 * 
 * @returns a navigation bar.
 */
const NavigationBar = () => {

	/**
	 * Setup.
	 */
	const { currentUser } = useFirebase();



	/**
	 * Main content.
	 */
	return(
		<div className="navigation-bar">
			{menuOptions.map(({ text, url, userStatus }: MenuObject, key) => {

				// Determine fate of specific button.
				let display;
				switch(userStatus) {
					case('online'):
						display = currentUser ? true : false;
						break;
					case('offline'):
						display = currentUser ? false : true;
						break;
					default:
						if (userStatus !== 'any') {
							console.warn(`NavigationBar >> an object with userStatus that did't match with "online", "offline", or "any" was detected. It'll be treated as "any".`);
						}
						display = true;
				}

				// Return button.
				return display && (<NavLink to={url} style={{ textDecoration: 'none' }} key={key}>{text}</NavLink>);

			})}
		</div>
	);
}

export default NavigationBar;

