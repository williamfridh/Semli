import {
	collection,
	collectionGroup,
	doc,
	DocumentData,
	DocumentSnapshot,
	Firestore,
	getDocs,
	limit,
	orderBy,
	OrderByDirection,
	query,
	startAfter,
	where
} from "@firebase/firestore";
import { useEffect, useState } from "react";



/**
 * Types.
 */
type usePostHookType = (
	firestoreDatabase	: Firestore,
	orderByField		: string,
	orderByDirection	: OrderByDirection | undefined,
	runNumber			: number,
	fetchLimit			: number,
	uid					?: string,
	hashtagName			?: string
) => usePostHookReturn;

type usePostHookReturn = {
	postsData			: DocumentSnapshot<DocumentData>[],
    isLoading			: boolean,
    errorCode			: number|null
}

type getPostsType = () => Promise<void>;



/**
 * Post hook.
 * 
 * Hook to load post data.
 * 
 * @param firestoreDatabase - Firestore database session.
 * @param orderByField - order by this field.
 * @param orderByDirection - order type (ASC|DESC).
 * @param runNumber - the run number, first time is 1, second 2, and so on.
 * @param fetchLimit - limit of docs to fetch.
 * @param userDocRef - used for finding docs by this user.
 * @param hashtagDocRef - used for finding docs with this hashtag.
 * @returns - a hook.
 */
const usePostHook: usePostHookType = (firestoreDatabase, orderByField, orderByDirection, runNumber, fetchLimit, uid, hashtagName) => {
	
	const [postsData, setPostsData] 		= useState([] as DocumentSnapshot<DocumentData>[]);
	const [isLoading, setIsLoading] 		= useState(false);
	const [errorCode, setErrorCode] 		= useState<number|null>(null);
	

	/**
	 * This useEffect triggers the actions on mount, runNumber chnage or order change (orderByField & orderByDirection).
	 */
	useEffect(() => {

		let isMounted = true;

		const getPosts: getPostsType = async () => {

			try {

				if (!runNumber) setPostsData([]);
				
				setIsLoading(true);
				setErrorCode(null);
				const orderByShort = orderBy(orderByField, orderByDirection);
				const limitShort = limit(fetchLimit);
				
				let postQuery;
				if (uid) {
					postQuery = query(collection(firestoreDatabase, `users`, doc(firestoreDatabase, `users`, uid).id, `posts`), orderByShort, limitShort);
				} else if (hashtagName) {
					postQuery = query(collectionGroup(firestoreDatabase, `posts`), where("hashtags", "array-contains", doc(firestoreDatabase, `hashtags`, hashtagName).id), orderByShort, limitShort);
				} else {
					postQuery = query(collectionGroup(firestoreDatabase, 'posts'), orderByShort, limitShort);
				}

				if (!isMounted) return;

				if (runNumber) postQuery = query(postQuery, startAfter(postsData[(runNumber * fetchLimit)-1]));
				
				const querySnap = await getDocs(postQuery);

				if (!isMounted) return;
				
				if (querySnap) {

					for (let i = 0; i < querySnap.size; i++) {
						setPostsData(prev => [...prev, querySnap.docs[i]]);
					}

					console.log(`usePostHook >> useEffect >> getPosts >> Success`);

				} else {
					console.warn("Posts >> useEffect >> getPosts >> No posts found.");
					setErrorCode(404);
				}
						
			} catch(e) {
				console.error(`usePostHook >> useEffect >> getPosts >> ${e}`);
				setErrorCode(400);
			} finally {
				setIsLoading(false);
			}
				
		}

		getPosts();

		return() => {
			console.log(`usePostHook >> useEffect >> Dismounted`);
			isMounted = false;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [runNumber]);



	/**
	 * Return hook content.
	 */
	return {postsData, isLoading, errorCode};

}

export default usePostHook;

