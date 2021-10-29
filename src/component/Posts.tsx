import { collection, doc, getDocs, query, where } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useFirebase } from "../context/FirebaseContext";
import { PostProps } from "../shared/types";
import Post from "./Post";



/**
 * Types.
 */
type PostsProps = {
	uid?: string,
	hashtag?: string
}



/**
 * 
 * @param props 
 * @returns 
 */
const Posts = (props: PostsProps) => {

	/**
	 * Setup.
	 */
	let { uid, hashtag } = props;
	let { firestoreDatabase } = useFirebase();
	const [posts, setPosts] = useState<PostProps[]|null>(null);
	const [isLoading, setIsLoading] = useState(true);

	/**
	 * Hooks.
	 */
	useEffect(() => {

		let isMounted = true;

		/**
		 * Get posts.
		 */
		const getPosts = async (uid?: string) => {
	
			let q;
			if (uid) {
				const uRef = doc(firestoreDatabase, 'users', uid);
				q = query(collection(firestoreDatabase, "posts"), where("user", "==", uRef));
			} else if (hashtag) {
				q = query(collection(firestoreDatabase, "posts"), where("hashtags", "array-contains", hashtag));
			} else {
				q = query(collection(firestoreDatabase, "posts"));
			}
	
			const qSnapshop = await getDocs(q);
	
			if (qSnapshop) {
	
				let postsToAdd: PostProps[] = [];
	
				qSnapshop.forEach(post => {
					const { body, hashtags, likes } = post.data();
					const id = post.id;
					postsToAdd.push({
						id,
						body,
						hashtags,
						likes
					});
				});
	
				isMounted && setPosts(postsToAdd);
			} else {
				// Redirect the user.
				console.log("No posts found.");
			}
	
			isMounted && setIsLoading(false);
	
		}
			
		getPosts(uid);

		return () => {
			isMounted = false;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);



	/**
	 * Create posts element.
	 */
	/*let postsList = <div>Loading...</div>;
	if (!isLoading) {
		if (posts) {
			postsList =
				posts.forEach((post) => {
					console.log(post.data());
					const { body, hashtags } = post.data();
					return <div>
						<p>{body}</p>
						<p>{hashtags}</p>
					</div>;
				});
		} else {
			postsList = <div>No posts found.</div>;
		}
	}
	console.log(postsList);*/



	/**
	 * Main content.
	 */
	return(
		<div className="posts">
			{
			isLoading ? <div>Loading...</div> : posts &&
			 posts.map((postProps: PostProps, key:number) => {
				return <Post {...postProps} key={key} />;
			 })
			}
		</div>
	);

}

export default Posts;

