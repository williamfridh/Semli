import {
	collection,
	deleteDoc,
	doc,
	DocumentData,
	DocumentSnapshot,
	Firestore,
	getDoc,
	getDocs,
	QuerySnapshot,
	serverTimestamp,
	setDoc
} from "@firebase/firestore";
import { useEffect, useState } from "react";



/**
 * Types.
 */
type useLikeHookType = (
	postDocSnap			: DocumentSnapshot<DocumentData>,
	currentUserDocSnap	: DocumentSnapshot<DocumentData>|null,
	firestoreDatabase	: Firestore
) => useLikeHookreturn;

type useLikeHookreturn = {
	likeAmount			: number,
	handleClick			: any,
	isLoading			: boolean,
	errorCode			: number|null,
	likedByCurrentUser	: boolean
}

type handleClickType = () => Promise<void>;

type fetchAndCalcLikesType = () => Promise<void>;



/**
 * Like/unklike hook.
 * 
 * This hook is used for handling like/unlike actions.
 * 
 * @param postDocSnap - target post Firebase doc snap.
 * @param currentUserDocSnap - user Firebase doc snap of the acting user.
 * @param firestoreDatabase - Firebase session.
 * @returns - a hook.
 */
const useLikeHook: useLikeHookType = (postDocSnap, currentUserDocSnap, firestoreDatabase) => {

	console.log(postDocSnap);

	const [likeAmount, setLikeAmount]					= useState(0);
	const [likedByCurrentUser, setLikedByCurrentUser] 	= useState(false);
	const [isLoading, setIsLoading] 					= useState(false);
	const [errorCode, setErrorCode] 					= useState<number|null>(null);

	const likeDocCollection = collection(firestoreDatabase, `${postDocSnap.ref.path}/likes`);
	const likeDocRef = doc(firestoreDatabase, `${postDocSnap.ref.path}/likes/${currentUserDocSnap?.id}`);



	/**
	 * Handle like/unlike button click.
	 * 
	 * @returns - nothing.
	 */
	const handleClick: handleClickType = async () => {
		
		if (!currentUserDocSnap) return;

		console.log(`useLikeHook >> handleClick >> Running...`);

		try {
			
			setErrorCode(null);
			setIsLoading(true);

			if (likedByCurrentUser) {
				await deleteDoc(likeDocRef);
				setLikedByCurrentUser(false);
			} else if (!likedByCurrentUser) {
				await setDoc(likeDocRef, {
					userRef: currentUserDocSnap.ref,
					created: serverTimestamp()
				});
				setLikedByCurrentUser(true);
			}

			await fetchAndCalcLikes();

			console.log(`useLikeHook >> handleClick >> Success`);

		} catch(e) {
			setErrorCode(400);
			console.error(`useLikeHook >> handleClick >> ${e}`);
		} finally {
			setIsLoading(false);
		}

	}



	/**
	 * Fetch and calcualte likes.
	 * 
	 * Func to fetch all likes from Firestore and calculate the amount.
	 * 
	 * @returns - nothing.
	 */
	const fetchAndCalcLikes: fetchAndCalcLikesType = async () => {
		const likes: QuerySnapshot<DocumentData> = await getDocs(likeDocCollection);
		let i = 0;
		likes.forEach((likes: DocumentData) => {
			i++;
		});
		setLikeAmount(i);
	}

	

	/**
	 * useEffect hook that triggers on mount. It checks if the current
	 * users has likes the post in question and calculated the amount of likes.
	 */
	useEffect(() => {

		let isMounted = true;

		const firstFetch = async () => {
			try {
				console.log(`useLikeHook >> useEffect >> firstFetch >> Running...`);
				await fetchAndCalcLikes();
				const likeDocSnap = await getDoc(likeDocRef);
				if (!isMounted) return;
				console.log(`useLikeHook >> useEffect >> firstFetch >> Success`);
				setLikedByCurrentUser(likeDocSnap.exists());
			} catch (e) {
				if (!isMounted) return;
				setErrorCode(400);
				console.error(`useLikeHook >> useEffect >> firstFetch >> ${e}`);
			} finally {
				if (!isMounted) return;
				setIsLoading(false);
			}
		}

		firstFetch();

		return() => {
			isMounted = false;
			console.log(`useLikeHook >> useEffect >> firstFetch >> Dismounted`);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);



	/**
	 * Return hook content.
	 */
	return {likeAmount, handleClick, isLoading, errorCode, likedByCurrentUser};

}

export default useLikeHook;

