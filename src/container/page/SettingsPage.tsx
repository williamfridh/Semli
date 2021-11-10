import LogOutButton from "component/LogOutButton";
import EditProfileForm from "container/form/EditProfileForm";
import * as SC from 'component/StyledComponents';

const SettingsPage = () => {
	return(
		<SC.Page>
			<SC.Title>Settings</SC.Title>
			<SC.Row><LogOutButton /></SC.Row>
			<EditProfileForm />
		</SC.Page>
	);
}

export default SettingsPage;

