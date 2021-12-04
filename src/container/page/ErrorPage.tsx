import { FunctionComponent, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as SC from 'component/StyledComponents';



/**
 * Types.
 */
type ErrorPageParams = {
	code: string
}



/**
 * Error page.
 * 
 * @returns a element.
 */
const ErrorPage: FunctionComponent = (): JSX.Element => {

	const { code }: ErrorPageParams = useParams();

	useEffect(() => {
		document.title = `Error ${code}`;
	}, [code])

	return(
		<SC.Page>
			<SC.Title>Error: {code}</SC.Title>
		</SC.Page>
	);

}

export default ErrorPage;

