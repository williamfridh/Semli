import {
	collection,
	collectionGroup,
	Firestore,
	getDocs,
	orderBy,
	query,
	where
} from "@firebase/firestore";
import { useEffect, useState } from "react";
import { HashtagProps } from "shared/types";



/**
 * Types.
 */
type useSearchFormHookType = (firestoreDatabase : Firestore) => useSearchFormHookReturn;

type useSearchFormHookReturn = {
	isLoading					: boolean,
	errorCode					: number|null,
	searchResult 				: HashtagProps[],
	handleSearchTermChange		: HandleSearchTermInterface,
	searchTerm					: string
}

type HandleSearchTermInterface  = (e: React.ChangeEvent<HTMLInputElement>) => void;



/**
 * Use Seach Form Hook.
 * 
 * A hook created to seperate logic from a view.
 * 
 * @param firestoreDatabase - Firestore session.1
 * @returns - a hook.
 */
const useSearchFormHook: useSearchFormHookType = (firestoreDatabase) => {
	
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

		setSearchResult([]);

		if (!searchTerm || searchTerm.length <= 2) return;

		setIsLoading(true);
		setErrorCode(null);
		console.log(`useSearchFormHook >> useEffect >> Running...`);

		const q = query(
			collection(firestoreDatabase, "hashtags"),
			where("name", ">=", searchTerm),
			where("name", "<=", searchTerm + '\uf8ff'),
			orderBy("name", "asc")
			);
		
		getDocs(q).then(qDocSnap => {

			if (!isMounted) return;

			for (let i = 0; i < qDocSnap.size; i++) {

				const hashtagSnap = qDocSnap.docs[i];
				const hashtagData = hashtagSnap.data();
				
				const postsCollection = collectionGroup(firestoreDatabase, `posts`);
				const postsQuery = query(postsCollection, where("hashtags", "array-contains", hashtagData.name));

				getDocs(postsQuery).then(postsWithHashtag => {
	
					setSearchResult(prev => [...prev, {
						'name': hashtagData.name,
						'amount': postsWithHashtag.size
					}]);

				});

			}
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

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchTerm]);



	/**
	 * Return all which are required.
	 */
	return {isLoading, errorCode, searchResult, handleSearchTermChange, searchTerm};

}

export default useSearchFormHook;

