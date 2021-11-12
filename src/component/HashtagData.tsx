import { FunctionComponent } from "react";
import { HashtagDataProps } from "shared/types";
import { useFirebase } from "context/FirebaseContext";
import Loading from "./Loading";
import * as SC from 'component/StyledComponents';
import useHashtag from "hook/useHashtag";
import { Redirect } from "react-router";

const HashtagData: FunctionComponent<HashtagDataProps> = (props): JSX.Element => {

	const { hashtagName } = props;
	const { firestoreDatabase } = useFirebase();

	const { hashtagData, isLoading, errorCode} = useHashtag(firestoreDatabase, hashtagName);

	if (errorCode) {
		return <Redirect to={`/error/${errorCode}`} />;
	}

	return(
		<div>
			{isLoading && <Loading/>}
			{hashtagData && <SC.SubTitle>{hashtagData['amount']} post{hashtagData['amount'] !== 1 ? `s` : ``}</SC.SubTitle>}
		</div>
	);

}

export default HashtagData;

