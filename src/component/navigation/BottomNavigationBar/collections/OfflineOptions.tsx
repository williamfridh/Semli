import * as StyledBottomNavigationBar from 'component/navigation/BottomNavigationBar/BottomNavigationBar.styled';
import { MdHome, MdAccountCircle } from 'react-icons/md';

const OnlineOptions = () => {

	return (
		<StyledBottomNavigationBar.Container>
			<StyledBottomNavigationBar.Button to={`/`}><MdHome /><StyledBottomNavigationBar.ButtonText>Home</StyledBottomNavigationBar.ButtonText></StyledBottomNavigationBar.Button>
			<StyledBottomNavigationBar.Button to={`/log_in`}><MdAccountCircle /><StyledBottomNavigationBar.ButtonText>Log In</StyledBottomNavigationBar.ButtonText></StyledBottomNavigationBar.Button>
		</StyledBottomNavigationBar.Container>
	);

}

export default OnlineOptions;

