import * as StyledDesktopNavigationBar from 'component/navigation/DesktopNavigationBar/DesktopNavigationBar.styled';
import { MdHome, MdAccountCircle, MdSearch } from 'react-icons/md';

const OnlineOptions = () => {

	return (
		<StyledDesktopNavigationBar.ButtonHolder>
			<StyledDesktopNavigationBar.Button to={`/`}><MdHome /></StyledDesktopNavigationBar.Button>
			<StyledDesktopNavigationBar.Button to={`/search`}><MdSearch /></StyledDesktopNavigationBar.Button>
			<StyledDesktopNavigationBar.Button to={`/log_in`}><MdAccountCircle /></StyledDesktopNavigationBar.Button>
		</StyledDesktopNavigationBar.ButtonHolder>
	);

}

export default OnlineOptions;

