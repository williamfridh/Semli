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
	posts		: PostProps[],
    isLoading	: boolean,
    failed		: boolean
}

const usePosts: usePostsInterface = (firestoreDatabase, uid, hashtagName) => {
	
	const [posts, setPosts] 			= useState([] as PostProps[]);
	const [isLoading, setIsLoading] 	= useState(false);
	const [failed, setFailed] 			= useState(false);

	useEffect(() => {

		let isMounted = true;

		console.log(`usePosts >> useEffect >> getPosts >> Running`);
		setIsLoading(true);
		setFailed(false);
		
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
			
				isMounted && setPosts(postsToAdd);

			} else {
				console.warn("Posts >> useEffect >> getPosts >> No posts found.");
			}
			
			isMounted && setIsLoading(false);

			console.log(`usePosts >> useEffect >> getPosts >> Success`);
			setIsLoading(false);
					
		}).catch(e => {
			console.error(`usePosts >> useEffect >> getPosts >> ${e}`);
			setIsLoading(false);
			setFailed(true);
		});

		console.log(uid);
		console.log(hashtagName);

		return() => {
			console.log(`usePosts >> useEffect >> Dismounted`);
			isMounted = false;
		}

	}, [uid, hashtagName]);

	return {posts, isLoading, failed};

}

export default usePosts;

