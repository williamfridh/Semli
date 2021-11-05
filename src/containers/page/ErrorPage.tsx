import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { ErrorPageParams } from "../../shared/types";
import * as S from '../../shared/globalStyles';

const ErrorPage: FunctionComponent = (): JSX.Element => {

	const { code }: ErrorPageParams = useParams();

	return(
		<S.Page>
			<S.Title>Error: {code}</S.Title>
		</S.Page>
	);

}

export default ErrorPage;

