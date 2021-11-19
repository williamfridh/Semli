import * as StyledDesktopNavigationBar from 'component/navigation/DesktopNavigationBar/DesktopNavigationBar.styled';
import { useFirebase } from 'context/FirebaseContext';
import { MdHome, MdAccountCircle, MdAddCircleOutline, MdSettings, MdSearch } from 'react-icons/md';

const OnlineOptions = () => {

	const { currentUserDocSnap } = useFirebase();

	return (
		<StyledDesktopNavigationBar.ButtonHolder>
			<StyledDesktopNavigationBar.Button to={`/`}><MdHome /></StyledDesktopNavigationBar.Button>
			<StyledDesktopNavigationBar.Button to={`/search`}><MdSearch /></StyledDesktopNavigationBar.Button>
			<StyledDesktopNavigationBar.Button to={`/post/create`}><MdAddCircleOutline /></StyledDesktopNavigationBar.Button>
			<StyledDesktopNavigationBar.Button to={`/profile/${currentUserDocSnap?.id}`}><MdAccountCircle /></StyledDesktopNavigationBar.Button>
			<StyledDesktopNavigationBar.Button to={`/settings`}><MdSettings /></StyledDesktopNavigationBar.Button>
		</StyledDesktopNavigationBar.ButtonHolder>
	);

}

export default OnlineOptions;

