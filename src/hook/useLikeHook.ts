import {
	collection,
	deleteDoc,
	doc,
	DocumentData,
	Firestore,
	getDoc,
	getDocs,
	QuerySnapshot,
	serverTimestamp,
	setDoc
} from "@firebase/firestore";
import { useEffect, useState } from "react";

interface useLikeHookInterface {
	(
		postDocSnap			: DocumentData,
		currentUserDocSnap	: DocumentData,
		firestoreDatabase	: Firestore
	): useLikeHookreturn
}

type useLikeHookreturn = {
	likeAmount			: number,
	handleClick			: any,
	isLoading			: boolean,
	errorCode			: number|null,
	likedByCurrentUser	: boolean
}

const useLikeHook: useLikeHookInterface = (postDocSnap, currentUserDocSnap, firestoreDatabase) => {

	const [likeAmount, setLikeAmount]					= useState(0);
	const [likedByCurrentUser, setLikedByCurrentUser] 	= useState(false);
	const [isLoading, setIsLoading] 					= useState(false);
	const [errorCode, setErrorCode] 					= useState<number|null>(null);

	const likeDocCollection = collection(firestoreDatabase, `${postDocSnap.ref.path}/likes`);
	const likeDocRef = doc(firestoreDatabase, `${postDocSnap.ref.path}/likes/${currentUserDocSnap.id}`);

	const handleClick = async () => {
		
		if (!currentUserDocSnap) {
			return;
		}

		console.log(`useLikeHook >> handleClick >> Running...`);

		try {
			setErrorCode(null);
			setIsLoading(true);
			if (!likedByCurrentUser) {
				await setDoc(likeDocRef, {
					userRef: currentUserDocSnap.ref,
					created: serverTimestamp()
				});
				setLikedByCurrentUser(true);
			} else if (likedByCurrentUser) {
				await deleteDoc(likeDocRef);
				setLikedByCurrentUser(false);
			}

			await fetchLikes();

			console.log(`useLikeHook >> handleClick >> Success`);
		} catch(e) {
			setErrorCode(400);
			console.error(`useLikeHook >> handleClick >> ${e}`);
		} finally {
			setIsLoading(false);
		}

	}

	const fetchLikes = async () => {
		const likes: QuerySnapshot<DocumentData> = await getDocs(likeDocCollection);
		let i = 0;
		likes.forEach((likes: DocumentData) => {
			i++;
		});
		setLikeAmount(i);
	}

	useEffect(() => {

		const firstFetch = async () => {
			try {
				console.log(`useLikeHook >> useEffect >> firstFetch >> Running...`);
				await fetchLikes();
				const likeDocSnap = await getDoc(likeDocRef);
				setLikedByCurrentUser(likeDocSnap.exists());
			} catch (e) {
				setErrorCode(400);
				console.error(`useLikeHook >> useEffect >> firstFetch >> ${e}`);
			} finally {
				setIsLoading(false);
			}
		}

		firstFetch();

	}, []);

	return {likeAmount, handleClick, isLoading, errorCode, likedByCurrentUser};

}

export default useLikeHook;

