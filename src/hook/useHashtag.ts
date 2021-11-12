import { doc, Firestore, getDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { HashtagName, HashtagProps } from "shared/types";

interface useHashtagInterface {
	(
		firestoreDatabase	: Firestore,
		hashtagName			: HashtagName
	): useHashtagReturn
}

type useHashtagReturn = {
	hashtagData		: HashtagProps,
	isLoading		: boolean,
	errorCode		: null|number
}

const useHashtag: useHashtagInterface = (firestoreDatabase, hashtagName) => {

	const [hashtagData, setHashtagData] 	= useState({} as HashtagProps);
	const [isLoading, setIsLoading] 		= useState(false);
	const [errorCode, setErrorCode] 		= useState<number|null>(null);

	useEffect(() => {

		let isMounted = true;

		console.log(`useHashtag >> useEffect >> Running...`);

		const hashtagDocRef = doc(firestoreDatabase, 'hashtags', hashtagName as string);

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

				
				console.log(`useHashtag >> useEffect >> Success.`);

			} else {
				setErrorCode(404);
				console.error(`useHashtag >> useEffect >> Not found.`);
			}

			
			setIsLoading(false);

		}).catch(e => {
			setErrorCode(400);
			setIsLoading(false);
			console.error(`useHashtag >> useEffect >> ${e}`);
		});

		return() => {
			isMounted = false;
		}

		// eslint-disable-next-line
	}, [hashtagName]);

	return {hashtagData, isLoading, errorCode};

}

export default useHashtag;

