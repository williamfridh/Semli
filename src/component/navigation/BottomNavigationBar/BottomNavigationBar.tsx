import { FunctionComponent } from 'react';
import { useFirebase } from 'context/FirebaseContext';
import * as StyledBottomNavigationBar from 'component/navigation/BottomNavigationBar/BottomNavigationBar.styled';
import OnlineOptions from 'component/navigation/BottomNavigationBar/collections/OnlineOptions';
import OfflineOptions from 'component/navigation/BottomNavigationBar/collections/OfflineOptions';



/**
 * Create a navigation bar element.
 * 
 * @returns a navigation bar.
 */
const BottomNavigationBar: FunctionComponent = (): JSX.Element => {

	const { currentUser } = useFirebase();

	return <StyledBottomNavigationBar.Bar>{currentUser ? <OnlineOptions /> : <OfflineOptions />}</StyledBottomNavigationBar.Bar>;
}

export default BottomNavigationBar;

