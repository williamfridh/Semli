import * as StyledBottomNavigationBar from 'component/navigation/BottomNavigationBar/BottomNavigationBar.styled';
import { useFirebase } from 'context/FirebaseContext';
import { MdHome, MdAccountCircle, MdAddCircleOutline } from 'react-icons/md';

const OnlineOptions = () => {

	const { currentUserDocSnap } = useFirebase();

	return (
		<StyledBottomNavigationBar.Container>
			<StyledBottomNavigationBar.Button to={`/`}><MdHome /></StyledBottomNavigationBar.Button>
			<StyledBottomNavigationBar.Button to={`/post/create`}><MdAddCircleOutline /></StyledBottomNavigationBar.Button>
			<StyledBottomNavigationBar.Button to={`/profile/${currentUserDocSnap?.id}`}><MdAccountCircle /></StyledBottomNavigationBar.Button>
		</StyledBottomNavigationBar.Container>
	);

}

export default OnlineOptions;

