import { FunctionComponent } from 'react';
import { useFirebase } from 'context/FirebaseContext';
import * as StyledNavigationBar from './NavigationBar.styled';
import OnlineOptions from './Collections/OnlineOptions';
import OfflineOptions from './Collections/OfflineOptions';



/**
 * Create a navigation bar element.
 * 
 * @returns a navigation bar.
 */
const NavigationBar: FunctionComponent = (): JSX.Element => {

	const { currentUserDocSnap } = useFirebase();

	return <StyledNavigationBar.Bar>{currentUserDocSnap ? <OnlineOptions /> : <OfflineOptions />}</StyledNavigationBar.Bar>;
}

export default NavigationBar;

