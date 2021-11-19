import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import * as SC from 'component/StyledComponents';



/**
 * Types.
 */
type ErrorPageParams = {
	code			: string
}

const ErrorPage: FunctionComponent = (): JSX.Element => {

	const { code }: ErrorPageParams = useParams();

	return(
		<SC.Page>
			<SC.Title>Error: {code}</SC.Title>
		</SC.Page>
	);

}

export default ErrorPage;

