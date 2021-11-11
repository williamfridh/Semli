import { FunctionComponent, useEffect, useState } from "react";
import { HashtagDataProps, HashtagProps, } from "shared/types";
import { useFirebase } from "context/FirebaseContext";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import Loading from "./Loading";
import * as SC from 'component/StyledComponents';

const HashtagData: FunctionComponent<HashtagDataProps> = (props): JSX.Element => {

	const { hashtagName } = props;
	const { firestoreDatabase } = useFirebase();

	const [hashtag, setHashtag] 		= useState<HashtagProps|null>(null);
	const [isLoading, setIsLoading] 	= useState(true);

	useEffect(() => {
		
		let isMounted = true;
		
		const loadHashtag = async (): Promise<void>=> {

			console.log(`HashtagData >> useEffect >> loadHashtag >> Running`);

			try {

				isMounted && setIsLoading(true);
				const hashtagDocRef = doc(firestoreDatabase, 'hashtags', (hashtagName as string));
				const hashtagDocSnap = await getDoc(hashtagDocRef);
				const data: DocumentData|null = hashtagDocSnap.data() as DocumentData|null;
				if (!isMounted) {
					return;
				}
				if (!data) {
					setIsLoading(false);
					return;
				}
				const newData = {
					name: String(data?.name),
					amount: parseInt(data?.amount)
				}
				setHashtag(newData);
				setIsLoading(false);

			} catch (e) {
				console.error(`HashtagData >> useEffect >> loadHashtag >> ${e}`);
			}

		}

		loadHashtag();

		return () => {
			isMounted = false;
			console.log(`HashtagData >> useEffect >> Dismounted`);
		}

		// eslint-disable-next-line
	}, []);

	return(
		<div>
			{isLoading && <Loading/>}
			{hashtag && <SC.SubTitle>{hashtag['amount']} post{hashtag['amount'] !== 1 ? `s` : ``}</SC.SubTitle>}
		</div>
	);

}

export default HashtagData;

