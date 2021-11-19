import { FunctionComponent, useCallback, useRef, useState } from "react";
import { useFirebase } from "context/FirebaseContext";
import Post from "./Post/";
import usePostHook from "hook/usePostHook";
import { Redirect } from "react-router";
import { doc, DocumentData, DocumentSnapshot, OrderByDirection } from "@firebase/firestore";
import LoadingSmall from "./LoadingSmall";



/**
 * Types.
 */
type PostsProps = {
	uid?			: string,
	hashtagName?	: string
}



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
	// eslint-disable-next-line
	const [fetchLimit, setPostsLimit] 			= useState(2);
	// eslint-disable-next-line
	const [orderByField, setOrderByField] 		= useState('created');
	// eslint-disable-next-line
	const [orderByKeyword, setOrderByKeyword] 	= useState<OrderByDirection|undefined>('desc');

	// Pagination hooks.
	const moreExists 					= useRef(false);
	const observer 						= useRef<IntersectionObserver|null>(null);
	const [runNumber, setNunNumber] 	= useState(1);

	const userDocRef = uid ? doc(firestoreDatabase, `users/${uid}`) : undefined;
	const hashtagDocRef = hashtagName ? doc(firestoreDatabase, `hashtags/${hashtagName}`) : undefined;
	
	const { postsData, isLoading, errorCode } = usePostHook(firestoreDatabase, orderByField, orderByKeyword, runNumber, fetchLimit, userDocRef, hashtagDocRef); // Last hook to call.

	const lastPostElementRefAction = useCallback(node => {

		if (observer.current) observer.current.disconnect();

		observer.current = new IntersectionObserver(entries => {
		  if (entries[0].isIntersecting) setNunNumber(runNumber + 1);
		});
		if (node) observer.current.observe(node);

		// eslint-disable-next-line
	}, [isLoading, moreExists]);

	if (errorCode) return <Redirect to={`/error/${errorCode}`} />;

	const postsCollection: React.ReactNode = postsData && postsData.map((postDocSnap: DocumentSnapshot<DocumentData>, key: number) => {
		moreExists.current = postsData.length === fetchLimit*runNumber ? true : false;
		if (moreExists.current && key + 1 === postsData.length) {
			return <Post postDocSnap={postDocSnap} key={key} refToPass={lastPostElementRefAction} />;
		} else {
			return <Post postDocSnap={postDocSnap} key={key} />;
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

