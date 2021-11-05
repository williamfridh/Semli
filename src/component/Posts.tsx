import { collection, doc, DocumentData, getDocs, query, QueryDocumentSnapshot, where } from "firebase/firestore";
import { FunctionComponent, useEffect, useState } from "react";
import { useFirebase } from "../context/FirebaseContext";
import { PostProps, PostsProps } from "../shared/types";
import Post from "./Post/";



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

			try {
		
				let q;
				if (uid) {
					const uRef = doc(firestoreDatabase, 'users', uid); // This is not a ref to the current user doc!
					q = query(collection(firestoreDatabase, "posts"), where("user", "==", uRef));
				} else if (hashtagName) {
					q = query(collection(firestoreDatabase, "posts"), where("hashtags", "array-contains", hashtagName));
				} else {
					q = query(collection(firestoreDatabase, "posts"));
				}
		
				const qSnap = await getDocs(q);
		
				if (qSnap) {
		
					let postsToAdd: PostProps[] = [];
		
					qSnap.forEach((post: QueryDocumentSnapshot<DocumentData>) => {
						const { body, hashtags, likes } = post.data();
						postsToAdd.push({
							id: post.id,
							body,
							hashtags,
							likes
						});
					});
		
					isMounted && setPosts(postsToAdd);

				} else {
					console.warn("Posts >> No posts found.");
				}
		
				isMounted && setIsLoading(false);

			} catch (e) {
				console.error(`Posts >> ${e}`);
			}
	
		}
			
		getPosts(uid);

		return () => {
			isMounted = false;
		}
		
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let postsCollection: React.ReactNode = posts && posts.map((postProps: PostProps, key:number) => {
		return <Post {...postProps} key={key} />;
	 });

	return(
		<div className="posts">
			{isLoading ? <div>Loading...</div> : postsCollection}
		</div>
	);

}

export default Posts;

