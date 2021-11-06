import LogOutButton from "component/LogOutButton";
import CompleteProfileForm from "container/form/CompleteProfileForm";
import * as SC from 'component/StyledComponents';

const CompleteAccountPage = () => {
	return(
		<SC.Page>
			<SC.Title>Complete Account</SC.Title>
			<CompleteProfileForm />
			<LogOutButton />
		</SC.Page>
	);
}

export default CompleteAccountPage;

