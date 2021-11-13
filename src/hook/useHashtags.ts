import { getDoc } from "@firebase/firestore";
import { DocumentData, DocumentReference } from "firebase/firestore";
import { useEffect, useState } from "react";
import { HashtagProps } from "shared/types";

interface useHashtagsInterface {
	(
		hashtagDocRef	: DocumentReference<DocumentData>
	): useHashtagsReturn
}

type useHashtagsReturn = {
	hashtagData		: HashtagProps,
	isLoading		: boolean,
	errorCode		: null|number
}

const useHashtags: useHashtagsInterface = (hashtagDocRef) => {

	const [hashtagData, setHashtagData] 	= useState({} as HashtagProps);
	const [isLoading, setIsLoading] 		= useState(false);
	const [errorCode, setErrorCode] 		= useState<number|null>(null);

	useEffect(() => {

		let isMounted = true;

		console.log(`useHashtags >> useEffect >> Running...`);

		setIsLoading(true);
		setErrorCode(null);

		getDoc(hashtagDocRef).then(hashtahDocSnap => {

			if (!isMounted) {
				return false;
			}

			if (hashtahDocSnap.exists()) {

				const tempData = hashtahDocSnap.data();

				const newData = {
					name: String(tempData?.name),
					amount: parseInt(tempData?.amount)
				}

				setHashtagData(newData);

				
				console.log(`useHashtags >> useEffect >> Success.`);

			} else {
				setErrorCode(404);
				console.error(`useHashtags >> useEffect >> Not found.`);
			}

			
			setIsLoading(false);

		}).catch(e => {
			setErrorCode(400);
			setIsLoading(false);
			console.error(`useHashtags >> useEffect >> ${e}`);
		});

		return() => {
			isMounted = false;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {hashtagData, isLoading, errorCode};

}

export default useHashtags;

