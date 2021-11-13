import { collection, DocumentData, DocumentReference, Firestore, getDoc, getDocs, limit, orderBy, query, QueryDocumentSnapshot, where } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { PostProps } from "shared/types";

interface usePostsInterface {
	(
		firestoreDatabase	: Firestore,
		userDocRef			?: DocumentReference<DocumentData>,
		hashtagDocRef		?: DocumentReference<DocumentData>
	): usePostsReturn
}

type usePostsReturn = {
	postsData		: PostProps[],
    isLoading		: boolean,
    errorCode		: number|null
}

const usePosts: usePostsInterface = (firestoreDatabase, userDocRef, hashtagDocRef) => {
	
	const [postsData, setPostsData] 	= useState([] as PostProps[]);
	const [isLoading, setIsLoading] 	= useState(false);
	const [errorCode, setErrorCode] 	= useState<number|null>(null);
	const firestoreCollection = collection(firestoreDatabase, 'posts');

	useEffect(() => {

		let isMounted = true;

		const getPosts = async () => {

			try {

				console.log(`usePosts >> useEffect >> getPosts >> Running`);
				setIsLoading(true);
				setErrorCode(null);
				
				let postQuery;
				if (userDocRef) {
					postQuery = query(firestoreCollection, where("user", "==", userDocRef), orderBy("created", "desc"), limit(10));
				} else if (hashtagDocRef) {
					const hashtagDocSnap = await getDoc(hashtagDocRef);
					if (!isMounted) {
						return;
					}
					postQuery = query(firestoreCollection, where("hashtags", "array-contains", hashtagDocSnap.id), orderBy("created", "desc"), limit(10));
				} else {
					postQuery = query(firestoreCollection, orderBy("created", "desc"), limit(10));
				}
				
				const querySnap = await getDocs(postQuery);
				if (!isMounted) {
					return;
				}
				
				if (querySnap) {
				
					let postsToAdd: PostProps[] = [];
				
					querySnap.forEach((post: QueryDocumentSnapshot<DocumentData>) => {
						const { body, hashtags, likes, user } = post.data();
						postsToAdd.push({
							id: post.id,
							body,
							hashtags,
							likes,
							user
						});
					});
				
					setPostsData(postsToAdd);
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
	}, []);

	return {postsData, isLoading, errorCode};

}

export default usePosts;

