import { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { useFirebase } from "context/FirebaseContext";
import Post from "./Post/";
import usePostHook from "hook/usePostHook";
import { Redirect } from "react-router";
import { DocumentData, DocumentSnapshot, OrderByDirection } from "@firebase/firestore";
import LoadingSmall from "./LoadingSmall";



/**
 * Types.
 */
type PostsProps = {
	fetchLimit			: number,
	orderByField		: string,
	orderByDirection	: OrderByDirection | undefined,
	uid					?: string,
	hashtagName			?: string
}



/**
 * Post list element.
 * 
 * @param fetchLimit - the number of items to fetch each round.
 * @param orderByField - name of a field to order the fetched documents by.
 * @param orderByDirection - direction of the order (desc, asc).
 * @param uid - target owner of docs to fetch.
 * @param hashtagName - target hashtag of docs to fetch.
 * @returns an element.
 */
const Posts: FunctionComponent<PostsProps> = (props): JSX.Element=> {

	const { fetchLimit, orderByField, orderByDirection, uid, hashtagName } = props;
	const { firestoreDatabase } = useFirebase();

	// Pagination hooks.
	const moreExists 					= useRef(false);
	const observer 						= useRef<IntersectionObserver|null>(null);
	const [runNumber, setRunNumber] 	= useState(0);

	// Detect change of provided data. Other changes (fetchLimit, orderByField, orderByDirection) will be detected inside the 
	useEffect(() => {
		setRunNumber(0);
	}, [props]);
	
	const { postsData, isLoading, errorCode } = usePostHook(firestoreDatabase, orderByField, orderByDirection, runNumber, fetchLimit, uid, hashtagName); // Last hook to call.

	const lastPostElementRefAction = useCallback(node => {

		if (observer.current) observer.current.disconnect();

		observer.current = new IntersectionObserver(entries => {
		  if (entries[0].isIntersecting) setRunNumber(runNumber + 1);
		});
		if (node) observer.current.observe(node);

		// eslint-disable-next-line
	}, [isLoading, moreExists]);

	if (errorCode) return <Redirect to={`/error/${errorCode}`} />;

	const postsCollection: React.ReactNode = postsData && postsData.map((postDocSnap: DocumentSnapshot<DocumentData>, key: number) => {
		if (postsData.length === fetchLimit*(runNumber+1)) {
			moreExists.current = true;
		} else {
			moreExists.current = false;
		}
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

