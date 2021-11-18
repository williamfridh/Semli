import {
	collection,
	DocumentData,
	DocumentReference,
	DocumentSnapshot,
	Firestore,
	getDoc,
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
	orderByKeyword		: OrderByDirection | undefined,
	runNumber			: number,
	fetchLimit			: number,
	userDocRef			?: DocumentReference<DocumentData>,
	hashtagDocRef		?: DocumentReference<DocumentData>
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
 * @param orderByKeyword - order type (ASC|DESC).
 * @param runNumber - the run number, first time is 1, second 2, and so on.
 * @param fetchLimit - limit of docs to fetch.
 * @param userDocRef - used for finding docs by this user.
 * @param hashtagDocRef - used for finding docs with this hashtag.
 * @returns - a hook.
 */
const usePostHook: usePostHookType = (firestoreDatabase, orderByField, orderByKeyword, runNumber, fetchLimit, userDocRef, hashtagDocRef) => {
	
	const [postsData, setPostsData] 		= useState([] as DocumentSnapshot<DocumentData>[]);
	const [isLoading, setIsLoading] 		= useState(false);
	const [errorCode, setErrorCode] 		= useState<number|null>(null);

	const firestoreCollection 				= collection(firestoreDatabase, 'posts');

	

	/**
	 * This useEffect triggers the actions on mount, runNumber chnage or order change (orderByField & orderByKeyword).
	 */
	useEffect(() => {

		let isMounted = true;

		const getPosts: getPostsType = async () => {

			try {

				console.log(`usePostHook >> useEffect >> getPosts >> Running`);
				setIsLoading(true);
				setErrorCode(null);
				const orderByShort = orderBy(orderByField, orderByKeyword);
				const limitShort = limit(fetchLimit);
				
				let postQuery;
				if (userDocRef) {
					postQuery = query(firestoreCollection, where("user", "==", userDocRef), orderByShort, limitShort);
				} else if (hashtagDocRef) {
					const hashtagDocSnap = await getDoc(hashtagDocRef);
					if (!isMounted) return;
					postQuery = query(firestoreCollection, where("hashtags", "array-contains", hashtagDocSnap.id), orderByShort, limitShort);
				} else {
					postQuery = query(firestoreCollection, orderByShort, limitShort);
				}

				if (postsData.length) postQuery = query(postQuery, startAfter(postsData[postsData.length - 1]));
				
				const querySnap = await getDocs(postQuery);

				if (!isMounted) return;
				
				if (querySnap) {
				
					let newPostsData: DocumentSnapshot<DocumentData>[] = postsData;
				
					querySnap.forEach((post: DocumentSnapshot<DocumentData>) => {
						newPostsData.push(post);
					});
				
					setPostsData(newPostsData);
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
	}, [orderByField, orderByKeyword, runNumber]);



	/**
	 * Return hook content.
	 */
	return {postsData, isLoading, errorCode};

}

export default usePostHook;

