import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { ErrorPageParams } from "shared/types";
import * as SC from 'component/StyledComponents';

const ErrorPage: FunctionComponent = (): JSX.Element => {

	const { code }: ErrorPageParams = useParams();

	return(
		<SC.Page>
			<SC.Title>Error: {code}</SC.Title>
		</SC.Page>
	);

}

export default ErrorPage;

