import LogOutButton from "../../component/LogOutButton";
import CompleteProfileForm from "../form/CompleteProfileForm";
import * as S from '../../shared/globalStyles';

const CompleteAccountPage = () => {
	return(
		<S.Page>
			<S.Title>Complete Account</S.Title>
			<CompleteProfileForm />
			<LogOutButton />
		</S.Page>
	);
}

export default CompleteAccountPage;

