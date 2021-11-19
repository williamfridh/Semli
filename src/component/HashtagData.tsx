import { FunctionComponent } from "react";
import { useFirebase } from "context/FirebaseContext";
import Loading from "./Loading";
import * as SC from 'component/StyledComponents';
import useHashtagHook from "hook/useHashtagHook";
import { Redirect } from "react-router";
import { doc } from "@firebase/firestore";



/**
 * Types.
 */
type HashtagDataProps = {
	hashtagName: string
}



const HashtagData: FunctionComponent<HashtagDataProps> = (props): JSX.Element => {

	const { hashtagName } 			= props;
	const { firestoreDatabase } 	= useFirebase();
	const hashtagDocRef 			= doc(firestoreDatabase, `hashtags/${hashtagName}`);
	
	const {
		hashtagData,
		isLoading,
		errorCode
	} = useHashtagHook(hashtagDocRef);

	if (errorCode) return <Redirect to={`/error/${errorCode}`} />;

	return <>
		{isLoading && <Loading/>}
		{hashtagData && <SC.SubTitle>{hashtagData['amount']} post{hashtagData['amount'] !== 1 ? `s` : ``}</SC.SubTitle>}
	</>;

}

export default HashtagData;

