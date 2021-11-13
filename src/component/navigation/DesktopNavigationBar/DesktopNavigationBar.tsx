import Logo from 'component/Logo';
import * as StyledDesktopNavigationBar from './DesktopNavigationBar.styled';
import OnlineOptions from 'component/navigation/DesktopNavigationBar/collections/OnlineOptions';
import OfflineOptions from 'component/navigation/DesktopNavigationBar/collections/OfflineOptions';
import { useFirebase } from 'context/FirebaseContext';

const DesktopNavigationBar = () => {

	const { currentUser } = useFirebase();
	
	return(
		<StyledDesktopNavigationBar.Bar>
			<StyledDesktopNavigationBar.FlexContainer>
				<Logo />
				{currentUser ? <OnlineOptions /> : <OfflineOptions />}
			</StyledDesktopNavigationBar.FlexContainer>
		</StyledDesktopNavigationBar.Bar>
	);
}

export default DesktopNavigationBar;

