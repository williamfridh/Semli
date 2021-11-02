import LogOutButton from "../../component/LogOutButton";
import CompleteProfileForm from "../form/CompleteProfileForm";

const CompleteAccountPage = () => {
	return(
		<div className="page">
			<h1>Complete Account</h1>
			<CompleteProfileForm />
			<LogOutButton />
		</div>
	);
}

export default CompleteAccountPage;

