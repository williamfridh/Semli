import { FunctionComponent } from 'react';
import { useFirebase } from 'context/FirebaseContext';
import * as StyledTopNavigationBar from 'component/navigation/TopNavigationBar/TopNavigationBar.styled';
import { MdSettings, MdSearch } from "react-icons/md";



/**
 * Create a navigation bar element.
 * 
 * @returns a navigation bar.
 */
const TopNavigationBar: FunctionComponent = (): JSX.Element => {

	const { currentUserDocSnap } = useFirebase();

	return <StyledTopNavigationBar.Bar>
		<StyledTopNavigationBar.Container>
		{currentUserDocSnap && <StyledTopNavigationBar.Button to={`/settings`}><MdSettings /></StyledTopNavigationBar.Button>}
			<StyledTopNavigationBar.Logo>
				<StyledTopNavigationBar.LogoLetter>S</StyledTopNavigationBar.LogoLetter>
				<StyledTopNavigationBar.LogoLetter>E</StyledTopNavigationBar.LogoLetter>
				<StyledTopNavigationBar.LogoLetter>M</StyledTopNavigationBar.LogoLetter>
				<StyledTopNavigationBar.LogoLetter>L</StyledTopNavigationBar.LogoLetter>
				<StyledTopNavigationBar.LogoLetter>I</StyledTopNavigationBar.LogoLetter>
			</StyledTopNavigationBar.Logo>
			{currentUserDocSnap && <StyledTopNavigationBar.Button to={`/search`}><MdSearch /></StyledTopNavigationBar.Button>}
		</StyledTopNavigationBar.Container>
	</StyledTopNavigationBar.Bar>;
}

export default TopNavigationBar;

