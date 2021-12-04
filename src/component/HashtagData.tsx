import { FunctionComponent } from "react";
import { useFirebase } from "context/FirebaseContext";
import Loading from "./Loading";
import * as SC from 'component/StyledComponents';
import useHashtagHook from "hook/useHashtagHook";
import { Redirect } from "react-router";



/**
 * Types.
 */
type HashtagDataProps = {
	hashtagName: string
}



/**
 * Hashtag data element.
 * 
 * @param hashtagName - name of target hashtag.
 * @returns an element.
 */
const HashtagData: FunctionComponent<HashtagDataProps> = ({hashtagName}): JSX.Element => {

	const { firestoreDatabase } = useFirebase();
	
	const {
		hashtagData,
		isLoading,
		errorCode
	} = useHashtagHook(firestoreDatabase, hashtagName);

	if (errorCode) return <Redirect to={`/error/${errorCode}`} />;

	return <>
		{isLoading && <Loading/>}
		{hashtagData && <SC.SubTitle>{hashtagData['amount']} post{hashtagData['amount'] !== 1 ? `s` : ``}</SC.SubTitle>}
	</>;

}

export default HashtagData;

