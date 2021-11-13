import { FunctionComponent } from "react";
import { HashtagDataProps } from "shared/types";
import { useFirebase } from "context/FirebaseContext";
import Loading from "./Loading";
import * as SC from 'component/StyledComponents';
import useHashtags from "hook/useHashtags";
import { Redirect } from "react-router";
import { doc } from "@firebase/firestore";

const HashtagData: FunctionComponent<HashtagDataProps> = (props): JSX.Element => {

	const { hashtagName } = props;
	const { firestoreDatabase } = useFirebase();
	const hashtagDocRef = doc(firestoreDatabase, `hashtags/${hashtagName}`);

	const { hashtagData, isLoading, errorCode} = useHashtags(hashtagDocRef);

	if (errorCode) {
		return <Redirect to={`/error/${errorCode}`} />;
	}

	return(
		<>
			{isLoading && <Loading/>}
			{hashtagData && <SC.SubTitle>{hashtagData['amount']} post{hashtagData['amount'] !== 1 ? `s` : ``}</SC.SubTitle>}
		</>
	);

}

export default HashtagData;

