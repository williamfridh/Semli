import LogInWithGoogleButton from "component/LogInWithGoogleButton";
import * as SC from 'component/StyledComponents';
import { useEffect } from "react";


/**
 * Login page.
 * 
 * @returns an element.
 */
const LogInPage = () => {

	useEffect(() => {
		document.title = `Log in`;
	}, [])

	return(
		<SC.Page>
			<SC.Title>Log In</SC.Title>
			<LogInWithGoogleButton />
		</SC.Page>
	);
}

export default LogInPage;

