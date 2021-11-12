import { DocumentData, DocumentReference, updateDoc } from "@firebase/firestore";
import { useState } from "react";
import { PostLikeProps } from "shared/types";

interface useLikeInterface {
	(
		postDocRef			: DocumentReference<DocumentData>,
		currentUserDocRef	: DocumentReference<DocumentData>|null,
		initialValue		: PostLikeProps[]
	): useLikereturn
}

type useLikereturn = {
	likes			: PostLikeProps[],
	handleClick		: any,
	isLoading		: boolean,
	failedToLoad	: number|null
}

const useLike: useLikeInterface = (postDocRef, currentUserDocRef, initialValue) => {

	const [likes, setLikes]					= useState(initialValue);
	const [isLoading, setIsLoading] 		= useState(false);
	const [failedToLoad, setFailedToLoad] 	= useState<number|null>(null);

	const handleClick = async () => {

		if (!currentUserDocRef) {
			return;
		}

		console.log(`useLike >> handleClick >> Running...`);

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
			setFailedToLoad(null);
			setIsLoading(true);
			await updateDoc(postDocRef, postDataUpdate);
			setIsLoading(false);
			setLikes(newLikes as PostLikeProps[]);
			console.log(`useLike >> handleClick >> Success`);
		} catch (e) {
			setFailedToLoad(400);
			setIsLoading(false);
			console.error(`useLike >> handleClick >> ${e}`);
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

	return {likes, handleClick, isLoading, failedToLoad};

}

export default useLike;

