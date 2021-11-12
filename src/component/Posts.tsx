import { FunctionComponent } from "react";
import { useFirebase } from "context/FirebaseContext";
import { PostProps, PostsProps } from "shared/types";
import Post from "./Post/";
import Loading from "./Loading";
import usePosts from "hook/usePosts";
import { Redirect } from "react-router";



/**
 * Print post list element.
 * 
 * @param props 
 * @returns 
 */
const Posts: FunctionComponent<PostsProps> = (props): JSX.Element=> {

	const { uid, hashtagName } 	= props;
	const { firestoreDatabase } = useFirebase();

	const { postsData, isLoading, errorCode } = usePosts(firestoreDatabase, uid, hashtagName);

	if (errorCode) {
		return <Redirect to={`/error/${errorCode}`} />
	}

	const postsCollection: React.ReactNode = postsData && postsData.map((postProps: PostProps, key:number) => {
		return <Post {...postProps} key={key} />;
	 });

	return(
		<div>
			{isLoading ? <Loading/> : postsCollection}
		</div>
	);

}

export default Posts;

