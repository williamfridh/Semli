import { collection, doc, DocumentData, Firestore, getDocs, limit, orderBy, query, QueryDocumentSnapshot, where } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { PostProps } from "shared/types";

interface usePostsInterface {
	(
		firestoreDatabase	: Firestore,
		uid					?: string,
		hashtagName			?: string
	): usePostsReturn
}

type usePostsReturn = {
	postsData		: PostProps[],
    isLoading		: boolean,
    errorCode			: number|null
}

const usePosts: usePostsInterface = (firestoreDatabase, uid, hashtagName) => {
	
	const [postsData, setPostsData] 	= useState([] as PostProps[]);
	const [isLoading, setIsLoading] 	= useState(false);
	const [errorCode, setErrorCode] 	= useState<number|null>(null);

	useEffect(() => {

		let isMounted = true;

		console.log(`usePosts >> useEffect >> getPosts >> Running`);
		setIsLoading(true);
		setErrorCode(null);
		
		let postQuery;
		if (uid) {
			const uRef = doc(firestoreDatabase, 'users', uid); // This is not a ref to the current user doc!
			postQuery = query(collection(firestoreDatabase, "posts"), where("user", "==", uRef), orderBy("created", "desc"), limit(3));
		} else if (hashtagName) {
			postQuery = query(collection(firestoreDatabase, "posts"), where("hashtags", "array-contains", hashtagName), orderBy("created", "desc"), limit(3));
		} else {
			postQuery = query(collection(firestoreDatabase, "posts"), orderBy("created", "desc"), limit(3));
		}
		
		getDocs(postQuery).then(querySnap => {

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

			} else {
				console.warn("Posts >> useEffect >> getPosts >> No posts found.");
				setErrorCode(404);
			}
			
			setIsLoading(false);

			console.log(`usePosts >> useEffect >> getPosts >> Success`);
			setIsLoading(false);
					
		}).catch(e => {
			console.error(`usePosts >> useEffect >> getPosts >> ${e}`);
			setIsLoading(false);
			setErrorCode(400);
		});

		return() => {
			console.log(`usePosts >> useEffect >> Dismounted`);
			isMounted = false;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [uid, hashtagName]);

	return {postsData, isLoading, errorCode};

}

export default usePosts;

