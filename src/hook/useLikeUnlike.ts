import { DocumentData, DocumentReference, updateDoc } from "@firebase/firestore";
import { useState } from "react";
import { PostLikeProps } from "shared/types";

interface useLikeUnlikeInterface {
	(
		postDocRef			: DocumentReference<DocumentData>,
		currentUserDocRef	: DocumentReference<DocumentData>|null,
		initialValue		: PostLikeProps[]
	): useLikeUnlikereturn
}

type useLikeUnlikereturn = {
	likes			: PostLikeProps[],
	handleClick		: any,
	isLoading		: boolean,
	errorCode		: number|null
}

const useLikeUnlike: useLikeUnlikeInterface = (postDocRef, currentUserDocRef, initialValue) => {

	const [likes, setLikes]				= useState(initialValue ? initialValue : [] as PostLikeProps[]);
	const [isLoading, setIsLoading] 	= useState(false);
	const [errorCode, setErrorCode] 	= useState<number|null>(null);

	const handleClick = async () => {
		
		if (!currentUserDocRef) {
			return;
		}

		console.log(`useLikeUnlike >> handleClick >> Running...`);

		let newLikes;

		if (likes && likes.find((like: PostLikeProps) => like.id === currentUserDocRef.id)) {
			newLikes = unlike();
		} else {
			newLikes = like();
		}
		
		const postDataUpdate = {
			likes: newLikes
		};

		try {
			setErrorCode(null);
			setIsLoading(true);
			await updateDoc(postDocRef, postDataUpdate);
			setIsLoading(false);
			setLikes(newLikes as PostLikeProps[]);
			console.log(`useLikeUnlike >> handleClick >> Success`);
		} catch (e) {
			setErrorCode(400);
			setIsLoading(false);
			console.error(`useLikeUnlike >> handleClick >> ${e}`);
		}

	}

	const like = () => {
		if (!currentUserDocRef) {
			return;
		}
		return [...likes, currentUserDocRef];
	}

	const unlike = () => {
		if (!currentUserDocRef) {
			return;
		}
		return likes.filter((like: PostLikeProps) => like.id !== currentUserDocRef.id);
	}

	return {likes, handleClick, isLoading, errorCode};

}

export default useLikeUnlike;

