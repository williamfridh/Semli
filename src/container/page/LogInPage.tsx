import LogInWithGoogleButton from "component/LogInWithGoogleButton";
import * as SC from 'component/StyledComponents';

const LogInPage = () => {

	return(
		<SC.Page>
			<SC.Title>Log In</SC.Title>
			<LogInWithGoogleButton />
		</SC.Page>
	);
}

export default LogInPage;

