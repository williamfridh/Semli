import * as StyledBottomNavigationBar from 'component/navigation/BottomNavigationBar/BottomNavigationBar.styled';
import { useFirebase } from 'context/FirebaseContext';
import { MdHome, MdAccountCircle, MdAddCircleOutline } from 'react-icons/md';

const OnlineOptions = () => {

	const { currentUser } = useFirebase();

	return (
		<StyledBottomNavigationBar.Container>
			<StyledBottomNavigationBar.Button to={`/`}><MdHome /></StyledBottomNavigationBar.Button>
			<StyledBottomNavigationBar.Button to={`/post/create`}><MdAddCircleOutline /></StyledBottomNavigationBar.Button>
			<StyledBottomNavigationBar.Button to={`/profile/${currentUser?.uid}`}><MdAccountCircle /></StyledBottomNavigationBar.Button>
		</StyledBottomNavigationBar.Container>
	);

}

export default OnlineOptions;

