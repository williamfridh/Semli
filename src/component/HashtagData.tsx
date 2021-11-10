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
			try {
				setIsLoading(true);
				const hashtagDocRef = doc(firestoreDatabase, 'hashtags', (hashtagName as string));
				const hashtagDocSnap = await getDoc(hashtagDocRef);
				const data: DocumentData|null = hashtagDocSnap.data() as DocumentData|null;
				if (!data) {
					setIsLoading(false);
					return;
				}
				const newData = {
					name: String(data?.name),
					amount: parseInt(data?.amount)
				}
				isMounted && setHashtag(newData);
				setIsLoading(false);
			} catch (e) {
				console.error(`HashtagData >> ${e}`);
			}
		}

		loadHashtag();

		return () => {
			isMounted = false;
		}

		// eslint-disable-next-line
	}, []);

	return(
		<div className="HashtagData">
			<h3>
				{isLoading && <Loading/>}
				{hashtag && <SC.SubTitle>{hashtag['amount']} post{hashtag['amount'] !== 1 ? `s` : ``}</SC.SubTitle>}
			</h3>
		</div>
	);

}

export default HashtagData;

