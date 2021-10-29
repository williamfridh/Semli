import LogOutButton from "../../component/LogOutButton";
import EditProfileForm from "../form/EditProfileForm";



const SettingsPage = () => {
	return(
		<div className="page">
			<h1>Settings</h1>
			<LogOutButton />
			<EditProfileForm />
		</div>
	);
}

export default SettingsPage;

