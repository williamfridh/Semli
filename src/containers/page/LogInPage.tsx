import LogInWithGoogleButton from "../../component/LogInWithGoogleButton";
import * as S from '../../shared/globalStyles';

const LogInPage = () => {

	return(
		<S.Page>
			<S.Title>Log In</S.Title>
			<LogInWithGoogleButton />
		</S.Page>
	);
}

export default LogInPage;

