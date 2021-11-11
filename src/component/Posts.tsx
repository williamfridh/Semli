import { collection, doc, DocumentData, getDocs, query, QueryDocumentSnapshot, where, orderBy, startAt, endAt, limit } from "@firebase/firestore";
import { FunctionComponent, useEffect, useState } from "react";
import { useFirebase } from "context/FirebaseContext";
import { PostProps, PostsProps } from "shared/types";
import Post from "./Post/";
import Loading from "./Loading";



/**
 * Print post list element.
 * 
 * @param props 
 * @returns 
 */
const Posts: FunctionComponent<PostsProps> = (props): JSX.Element=> {

	const { uid, hashtagName } 	= props;
	const { firestoreDatabase } = useFirebase();
	
	const [posts, setPosts] 			= useState([] as PostProps[]);
	const [isLoading, setIsLoading] 	= useState(true);

	useEffect(() => {

		let isMounted = true;

		const getPosts = async (uid?: string): Promise<void> => {

			console.log(`Posts >> useEffect >> getPosts >> Running`);

			try {
		
				let q;
				if (uid) {
					const uRef = doc(firestoreDatabase, 'users', uid); // This is not a ref to the current user doc!
					q = query(collection(firestoreDatabase, "posts"), where("user", "==", uRef), orderBy("created", "desc"), limit(3));
				} else if (hashtagName) {
					q = query(collection(firestoreDatabase, "posts"), where("hashtags", "array-contains", hashtagName), orderBy("created", "desc"), limit(3));
				} else {
					q = query(collection(firestoreDatabase, "posts"), orderBy("created", "desc"), limit(3));
				}
		
				const qSnap = await getDocs(q);
		
				if (qSnap) {
		
					let postsToAdd: PostProps[] = [];
		
					qSnap.forEach((post: QueryDocumentSnapshot<DocumentData>) => {
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

			} catch (e) {
				console.error(`Posts >> useEffect >> getPosts >> ${e}`);
			}
	
		}
			
		getPosts(uid);

		return () => {
			console.log(`Posts >> useEffect >> Dismounted`);
			isMounted = false;
		}
		
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hashtagName]);

	let postsCollection: React.ReactNode = posts && posts.map((postProps: PostProps, key:number) => {
		return <Post {...postProps} key={key} />;
	 });

	return(
		<div>
			{isLoading ? <Loading/> : postsCollection}
		</div>
	);

}

export default Posts;

