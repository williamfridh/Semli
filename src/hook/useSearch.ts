import { collection, DocumentData, Firestore, getDocs, query, QueryDocumentSnapshot, where } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { HashtagProps } from "shared/types";

interface useSearchInterFace {
	(
		firestoreDatabase	: Firestore,
		term				: string
	): useSearchReturn
}

type useSearchReturn = {
	isLoading		: boolean,
	errorCode		: number|null,
	searchResult 	: HashtagProps[]
}

const useSearch: useSearchInterFace = (firestoreDatabase, term) => {

	const [searchResult, setSearchResult]	= useState([] as HashtagProps[]);
	const [isLoading, setIsLoading] 		= useState(false);
	const [errorCode, setErrorCode] 		= useState<number|null>(null);

	useEffect(() => {

		let isMounted = true;

		if (!term || term.length <= 2) {
			setSearchResult([]);
			return;
		}

		setIsLoading(true);
		setErrorCode(null);
		console.log(`useSearch >> useEffect >> Running...`);

		const q = query(collection(firestoreDatabase, "hashtags"), where("name", ">=", term), where("name", "<=", term + '\uf8ff'));
		getDocs(q).then(qDocSnap => {

			if (!isMounted) {
				return;
			}
		
			let hashtagArr: HashtagProps[] = [];
		
			qDocSnap.forEach((hashtagSnap: QueryDocumentSnapshot<DocumentData>) => {
				const hashtagData = hashtagSnap.data();
				const name = hashtagData.name;
				const amount = hashtagData.amount;
				hashtagArr.push({
					name,
					amount
				});
			});

			setSearchResult(hashtagArr);
			setIsLoading(false);
			console.log(`useSearch >> useEffect >> Success`);
				
		}).catch(e => {
			setErrorCode(400);
			console.error(`useSearch >> useEffect >> ${e}`);
		});

		return() => {
			isMounted = false;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [term]);

	return {isLoading, errorCode, searchResult};

}

export default useSearch;

