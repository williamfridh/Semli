import { NavLink } from 'react-router-dom';
import menuOptions from '../../json/menuOptions.json';



/**
 * Types.
 */
type MenuObject = {
	text		: string,
	url			: string,
	userStatus?	: string
}



/**
 * Create a navigation bar element.
 * 
 * This component prints items from a JSON file.
 * 
 * @returns a navigation bar.
 */
const NavigationBar = () => {
	return(
		<div className="navigation-bar">
			{menuOptions.map(({ text, url }: MenuObject, key) => {
				return <NavLink to={url} style={{ textDecoration: 'none' }} key={key}>{text}</NavLink>
			})}
		</div>
	);
}

export default NavigationBar;

