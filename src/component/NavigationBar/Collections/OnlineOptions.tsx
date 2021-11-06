import * as StyledNavigationBar from 'component/NavigationBar/NavigationBar.styled';
import { useFirebase } from 'context/FirebaseContext';
import { MdHome, MdSettings, MdAccountCircle, MdOutlineSearch } from 'react-icons/md';

const OnlineOptions = () => {

	const { currentUser } = useFirebase();

	return (
		<StyledNavigationBar.Container>
			<StyledNavigationBar.Button to={`/feed`}><MdHome /><StyledNavigationBar.ButtonText>Feed</StyledNavigationBar.ButtonText></StyledNavigationBar.Button>
			<StyledNavigationBar.Button to={`/search`}><MdOutlineSearch /><StyledNavigationBar.ButtonText>Search</StyledNavigationBar.ButtonText></StyledNavigationBar.Button>
			<StyledNavigationBar.Button to={`/settings`}><MdSettings /><StyledNavigationBar.ButtonText>Settings</StyledNavigationBar.ButtonText></StyledNavigationBar.Button>
			<StyledNavigationBar.Button to={`/profile/${currentUser?.uid}`}><MdAccountCircle /><StyledNavigationBar.ButtonText>My Profile</StyledNavigationBar.ButtonText></StyledNavigationBar.Button>
		</StyledNavigationBar.Container>
	);

}

export default OnlineOptions;

