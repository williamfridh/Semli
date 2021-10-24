import { NavLink } from 'react-router-dom';
import menuOptions from '../../json/menuOptions.json';



type MenuObject = {
	text: string,
	url: string
}



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

