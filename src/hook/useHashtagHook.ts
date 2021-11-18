import { getDoc } from "@firebase/firestore";
import { DocumentData, DocumentReference } from "firebase/firestore";
import { useEffect, useState } from "react";
import { HashtagProps } from "shared/types";



/**
 * Types.
 */
type useHashtagHookType = (
	hashtagDocRef	: DocumentReference<DocumentData>
) => useHashtagHookReturn;

type useHashtagHookReturn = {
	hashtagData		: HashtagProps,
	isLoading		: boolean,
	errorCode		: null|number
}



/**
 * Hashtag hook.
 * 
 * This hook can load hashtag data.
 * 
 * @param hashtagDocRef - Firestore reference to hashtag doc.
 * @returns - a hook.
 */
const useHashtagHook: useHashtagHookType = (hashtagDocRef) => {

	const [hashtagData, setHashtagData] 	= useState({} as HashtagProps);
	const [isLoading, setIsLoading] 		= useState(false);
	const [errorCode, setErrorCode] 		= useState<number|null>(null);


	
	/**
	 * This useEffect hook handels the magic.
	 * On mount, it fetches the hashtag data from Firestore.
	 */
	useEffect(() => {

		let isMounted = true;

		console.log(`useHashtagHook >> useEffect >> Running...`);

		setIsLoading(true);
		setErrorCode(null);

		getDoc(hashtagDocRef).then(hashtahDocSnap => {

			if (!isMounted) return false;

			if (hashtahDocSnap.exists()) {

				const tempData = hashtahDocSnap.data();

				const newData = {
					name: String(tempData?.name),
					amount: parseInt(tempData?.amount)
				}

				setHashtagData(newData);
				
				console.log(`useHashtagHook >> useEffect >> Success.`);

			} else {
				setErrorCode(404);
				console.error(`useHashtagHook >> useEffect >> Not found.`);
			}

		}).catch(e => {
			setErrorCode(400);
			console.error(`useHashtagHook >> useEffect >> ${e}`);
		}).finally(() => {
			setIsLoading(false);
		});

		return() => {
			isMounted = false;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {hashtagData, isLoading, errorCode};

}

export default useHashtagHook;

