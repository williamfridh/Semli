import Logo from 'component/Logo';
import * as StyledDesktopNavigationBar from './DesktopNavigationBar.styled';
import * as SC from 'component/StyledComponents';

const DesktopNavigationBar = () => {
	
	return(
		<StyledDesktopNavigationBar.Holder>
			<SC.Container>
				<Logo />
			</SC.Container>
		</StyledDesktopNavigationBar.Holder>
	);
}

export default DesktopNavigationBar;

