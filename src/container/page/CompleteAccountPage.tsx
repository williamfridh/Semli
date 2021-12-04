import LogOutButton from "component/LogOutButton";
import EditProfileForm from "container/form/EditProfileForm";
import * as SC from 'component/StyledComponents';
import { useEffect } from "react";


/**
 * Complete account page.
 * 
 * @returns an element.
 */
const CompleteAccountPage = () => {

	useEffect(() => {
		document.title = `Complete account`;
	}, [])

	return(
		<SC.Page>
			<SC.Title>Complete Account</SC.Title>
			<EditProfileForm />
			<LogOutButton />
		</SC.Page>
	);

}

export default CompleteAccountPage;

