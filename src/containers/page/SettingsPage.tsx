import LogOutButton from "../../component/LogOutButton";
import EditProfileForm from "../form/EditProfileForm";
import * as S from '../../shared/globalStyles';

const SettingsPage = () => {
	return(
		<S.Page>
			<S.Title>Settings</S.Title>
			<LogOutButton />
			<EditProfileForm />
		</S.Page>
	);
}

export default SettingsPage;

