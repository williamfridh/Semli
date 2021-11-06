import * as StyledNavigationBar from 'component/NavigationBar/NavigationBar.styled';
import { MdHome, MdAccountCircle } from 'react-icons/md';

const OnlineOptions = () => {

	return (
		<StyledNavigationBar.Container>
			<StyledNavigationBar.Button to={`/`}><MdHome /><StyledNavigationBar.ButtonText>Home</StyledNavigationBar.ButtonText></StyledNavigationBar.Button>
			<StyledNavigationBar.Button to={`/log_in`}><MdAccountCircle /><StyledNavigationBar.ButtonText>Log In</StyledNavigationBar.ButtonText></StyledNavigationBar.Button>
		</StyledNavigationBar.Container>
	);

}

export default OnlineOptions;

