import LogOutButton from "component/LogOutButton";
import EditProfileForm from "container/form/EditProfileForm";
import * as SC from 'component/StyledComponents';

const CompleteAccountPage = () => {
	return(
		<SC.Page>
			<SC.Title>Complete Account</SC.Title>
			<EditProfileForm />
			<LogOutButton />
		</SC.Page>
	);
}

export default CompleteAccountPage;

