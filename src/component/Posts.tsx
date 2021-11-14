import { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { useFirebase } from "context/FirebaseContext";
import { PostsProps } from "shared/types";
import Post from "./Post/";
import Loading from "./Loading";
import usePosts from "hook/usePosts";
import { Redirect } from "react-router";
import { doc, DocumentData, OrderByDirection, QueryDocumentSnapshot } from "@firebase/firestore";
import * as SC from 'component/StyledComponents';
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
	const userDocRef = uid ? doc(firestoreDatabase, `users/${uid}`) : undefined;
	const hashtagDocRef = hashtagName ? doc(firestoreDatabase, `hashtags/${hashtagName}`) : undefined;

	const postsLimit = 1;
	const [byField, setByField] = useState('created');
	const [byOrder, setByOrder] = useState<OrderByDirection|undefined>('desc');
	const moreExists = useRef(false);
	const [runNumber, setNunNumber] = useState(0);
	// useReducer ^^^

	const { postsData, isLoading, errorCode } = usePosts(firestoreDatabase, byField, byOrder, runNumber, postsLimit, userDocRef, hashtagDocRef);

	const observer = useRef<IntersectionObserver|null>(null);
	const lastPostElementRef = useCallback(node => {

		observer.current = new IntersectionObserver(entries => {
		  if (entries[0].isIntersecting) {
			setNunNumber(runNumber + 1);
		  }
		})
		if (node) observer.current.observe(node)

		console.log(node);
	}, [isLoading, moreExists]);

	const handleClick = () => {
		setNunNumber(runNumber + 1);
	}

	if (errorCode) {
		return <Redirect to={`/error/${errorCode}`} />
	}

	const postsCollection: React.ReactNode = postsData && postsData.map((post: QueryDocumentSnapshot<DocumentData>, key: number) => {
		console.log(postsData);
		console.log(postsLimit);
		if (postsData.length === postsLimit) {
			moreExists.current = true;
			//setMoreExists(true);
		} else {
			//setMoreExists(false);
			moreExists.current = false;
		}
		return <Post post={post} key={key} />;
	 });

	return(
		<>
			{postsCollection && <SC.Row>{postsCollection}</SC.Row>}
			{moreExists && isLoading ? <LoadingSmall /> : <SC.Button onClick={handleClick} ref={lastPostElementRef}>Load More</SC.Button>}
		</>
	);

}

export default Posts;

