import { collection, DocumentData, getDocs, orderBy, query, QueryDocumentSnapshot, where } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { HandleSearchTermInterface, HashtagProps, useSearchFormHookInterFace } from "shared/types";

const useSearchFormHook: useSearchFormHookInterFace = (firestoreDatabase) => {
	
	const [searchResult, setSearchResult]	= useState([] as HashtagProps[]);
	const [isLoading, setIsLoading] 		= useState(false);
	const [errorCode, setErrorCode] 		= useState<number|null>(null);
	const [searchTerm, setSearchTerm] 		= useState('');

	

	/**
	 * Handle search term change.
	 * 
	 * Filters and and sets the new term using a useState hook.
	 * 
	 * @param e - Event from input change.
	 * 
	 * @returns - Nothing.
	 */
	const handleSearchTermChange: HandleSearchTermInterface = e => {

		const val = e.target.value;

		const newSearchTerm = val
			.replaceAll('#', '')
			.replaceAll('å', 'a')
			.replaceAll('ä', 'a')
			.replaceAll('ö', 'o')
			.replaceAll(' ', '')
			.toLowerCase();

		setSearchTerm(newSearchTerm);

	}



	/**
	 * This useEffect is responsible for the search action. It detects search
	 * term change and searches when the term exceeds the the criteria.
	 */
	useEffect(() => {

		let isMounted = true;

		if (!searchTerm || searchTerm.length <= 2) {
			setSearchResult([]);
			return;
		}

		setIsLoading(true);
		setErrorCode(null);
		console.log(`useSearchFormHook >> useEffect >> Running...`);

		const q = query(collection(firestoreDatabase, "hashtags"), where("name", ">=", searchTerm), where("name", "<=", searchTerm + '\uf8ff'), orderBy("name", "asc"));
		
		getDocs(q).then(qDocSnap => {

			if (!isMounted)  return;
		
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
			console.log(`useSearchFormHook >> useEffect >> Success`);
				
		}).catch(e => {
			setErrorCode(400);
			console.error(`useSearchFormHook >> useEffect >> ${e}`);
		}).finally(() => {
			setIsLoading(false);
		});

		return() => {
			isMounted = false;
		}

	}, [searchTerm]);



	/**
	 * Return all which are required.
	 */
	return {isLoading, errorCode, searchResult, handleSearchTermChange, searchTerm};

}

export default useSearchFormHook;

