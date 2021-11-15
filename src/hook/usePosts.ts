import {
	collection,
	DocumentData,
	DocumentReference,
	Firestore,
	getDoc,
	getDocs,
	limit,
	orderBy,
	OrderByDirection,
	query,
	QueryDocumentSnapshot,
	startAfter,
	where
} from "@firebase/firestore";
import { useEffect, useState } from "react";

interface usePostsInterface {
	(
		firestoreDatabase	: Firestore,
		byField				: string,
		byOrder				: OrderByDirection | undefined,
		runNumber			: number,
		fetchLimit			: number,
		userDocRef			?: DocumentReference<DocumentData>,
		hashtagDocRef		?: DocumentReference<DocumentData>
	): usePostsReturn
}

type usePostsReturn = {
	postsData			: QueryDocumentSnapshot<DocumentData>[],
    isLoading			: boolean,
    errorCode			: number|null
}


const usePosts: usePostsInterface = (firestoreDatabase, byField, byOrder, runNumber, fetchLimit, userDocRef, hashtagDocRef) => {
	
	const [postsData, setPostsData] 		= useState([] as QueryDocumentSnapshot<DocumentData>[]);
	const [isLoading, setIsLoading] 		= useState(false);
	const [errorCode, setErrorCode] 		= useState<number|null>(null);

	const firestoreCollection 				= collection(firestoreDatabase, 'posts');

	useEffect(() => {

		let isMounted = true;

		const getPosts = async () => {

			try {

				console.log(`usePosts >> useEffect >> getPosts >> Running`);
				setIsLoading(true);
				setErrorCode(null);
				const orderByShort = orderBy(byField, byOrder);
				const limitShort = limit(fetchLimit);
				
				let postQuery;
				if (userDocRef) {
					postQuery = query(firestoreCollection, where("user", "==", userDocRef), orderByShort, limitShort);
				} else if (hashtagDocRef) {
					const hashtagDocSnap = await getDoc(hashtagDocRef);
					if (!isMounted) {
						return;
					}
					postQuery = query(firestoreCollection, where("hashtags", "array-contains", hashtagDocSnap.id), orderByShort, limitShort);
				} else {
					postQuery = query(firestoreCollection, orderByShort, limitShort);
				}

				if (postsData.length) {
					console.log(postsData[postsData.length - 1]);
					postQuery = query(postQuery, startAfter(postsData[postsData.length - 1]));
				}
				
				const querySnap = await getDocs(postQuery);
				if (!isMounted) {
					return;
				}
				
				if (querySnap) {
				
					let newPostsData: QueryDocumentSnapshot<DocumentData>[] = postsData;
				
					querySnap.forEach((post: QueryDocumentSnapshot<DocumentData>) => {
						newPostsData.push(post);
					});
				
					setPostsData(newPostsData);
					console.log(`usePosts >> useEffect >> getPosts >> Success`);

				} else {
					console.warn("Posts >> useEffect >> getPosts >> No posts found.");
					setErrorCode(404);
				}
				
				setIsLoading(false);
						
			} catch(e) {
				console.error(`usePosts >> useEffect >> getPosts >> ${e}`);
				setIsLoading(false);
				setErrorCode(400);
			}
				
		}

		getPosts();

		return() => {
			console.log(`usePosts >> useEffect >> Dismounted`);
			isMounted = false;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [byField, byOrder, runNumber]);

	return {postsData, isLoading, errorCode};

}

export default usePosts;

