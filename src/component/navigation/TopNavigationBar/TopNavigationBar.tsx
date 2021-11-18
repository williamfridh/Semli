import { FunctionComponent } from 'react';
import { useFirebase } from 'context/FirebaseContext';
import * as StyledTopNavigationBar from 'component/navigation/TopNavigationBar/TopNavigationBar.styled';
import { MdSettings, MdSearch } from "react-icons/md";
import Logo from 'component/Logo';



/**
 * Create a navigation bar element.
 * 
 * @returns a navigation bar.
 */
const TopNavigationBar: FunctionComponent = (): JSX.Element => {

	const { currentUserDocSnap } = useFirebase();

	return <StyledTopNavigationBar.Bar>
		<StyledTopNavigationBar.Container>
			
			<StyledTopNavigationBar.ButtonHolder>
				{currentUserDocSnap && <StyledTopNavigationBar.Button to={`/settings`}><MdSettings /></StyledTopNavigationBar.Button>}
			</StyledTopNavigationBar.ButtonHolder>

			<Logo margin="auto" />

			<StyledTopNavigationBar.ButtonHolder>
				<StyledTopNavigationBar.Button to={`/search`}><MdSearch /></StyledTopNavigationBar.Button>
			</StyledTopNavigationBar.ButtonHolder>

		</StyledTopNavigationBar.Container>
	</StyledTopNavigationBar.Bar>;

}

export default TopNavigationBar;

