import { FunctionComponent } from "react";
import { useParams } from "react-router-dom";
import { ErrorPageParams } from "../../shared/types";

const ErrorPage: FunctionComponent = (): JSX.Element => {

	const { code }: ErrorPageParams = useParams();

	return(
		<div className="page">
			<h1>Error: {code}</h1>
		</div>
	);

}

export default ErrorPage;

