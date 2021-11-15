import { FunctionComponent, useCallback, useRef, useState } from "react";
import { useFirebase } from "context/FirebaseContext";
import { PostsProps } from "shared/types";
import Post from "./Post/";
import usePosts from "hook/usePosts";
import { Redirect } from "react-router";
import { doc, DocumentData, OrderByDirection, QueryDocumentSnapshot } from "@firebase/firestore";
import LoadingSmall from "./LoadingSmall";



/**
 * Print post list element.
 * 
 * @param props 
 * @returns 
 */
const Posts: FunctionComponent<PostsProps> = (props): JSX.Element=> {

	const { uid, hashtagName } 	= props;

	const { firestoreDatabase } = useFirebase();

	// Filtering hooks.
	const [fetchLimit, setPostsLimit] 	= useState(2);
	const [byField, setByField] 		= useState('created');
	const [byOrder, setByOrder] 		= useState<OrderByDirection|undefined>('desc');

	// Pagination hooks.
	const moreExists 					= useRef(false);
	const observer 						= useRef<IntersectionObserver|null>(null);
	const [runNumber, setNunNumber] 	= useState(1);

	const userDocRef = uid ? doc(firestoreDatabase, `users/${uid}`) : undefined;
	const hashtagDocRef = hashtagName ? doc(firestoreDatabase, `hashtags/${hashtagName}`) : undefined;
	
	const { postsData, isLoading, errorCode } = usePosts(firestoreDatabase, byField, byOrder, runNumber, fetchLimit, userDocRef, hashtagDocRef); // Last hook to call.

	const lastPostElementRefAction = useCallback(node => {

		if (observer.current) observer.current.disconnect();

		observer.current = new IntersectionObserver(entries => {
		  if (entries[0].isIntersecting) setNunNumber(runNumber + 1);
		});
		if (node) observer.current.observe(node);

	}, [isLoading, moreExists]);

	if (errorCode) return <Redirect to={`/error/${errorCode}`} />;

	const postsCollection: React.ReactNode = postsData && postsData.map((post: QueryDocumentSnapshot<DocumentData>, key: number) => {
		moreExists.current = postsData.length === fetchLimit*runNumber ? true : false;
		if (moreExists.current && key + 1 === postsData.length) {
			return <Post post={post} key={key} refToPass={lastPostElementRefAction} />;
		} else {
			return <Post post={post} key={key} />;
		}
	 });

	return(
		<>
			{postsCollection}
			{isLoading && <LoadingSmall />}
		</>
	);

}

export default Posts;

