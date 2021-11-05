import { doc, DocumentData, QueryDocumentSnapshot, updateDoc } from "firebase/firestore";
import { FunctionComponent, useState } from "react";
import { useFirebase } from "../../context/FirebaseContext";
import { PostLikeProps, PostProps } from "../../shared/types";
import * as S from "./Post.styled";
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';

const Post: FunctionComponent<PostProps> = (props): JSX.Element => {

	const { id, body, hashtags, likes } = props;
	const { currentUser, firestoreDatabase, currentUserDocRef, currentUserDocSnap } = useFirebase();
	const [postLikes, setPostLikes] = useState(likes ? likes : [] as PostLikeProps[]);
	const postDocRef = doc(firestoreDatabase, `posts/${id}`);

	/**
	 * Handle like click.
	 * 
	 * @param e - event of the click.
	 * @returns nothing.
	 */
	const handleLikeClick = async (): Promise<void> => {

		if (!currentUser || !currentUserDocRef) {
			return;
		}

		try {

			let action: 'add'|'remove';
			
			if (postLikes && postLikes.find((like: PostLikeProps) => like !== currentUserDocSnap)) {
				action = 'remove';
			} else {
				action = 'add';
			}

			let postNewLikes;

			switch(action) {
				case('add'):
					if (postNewLikes) {
						postNewLikes = [...postLikes, currentUserDocRef];
					} else {
						postNewLikes = [currentUserDocRef];
					}
					break;
				case('remove'):
					postNewLikes = postLikes.filter((like: PostLikeProps) => like === currentUserDocSnap);
					break;
			}

			const userDataUpdate = {
				likes: postNewLikes
			};

			await updateDoc(postDocRef, userDataUpdate);

			setPostLikes(postNewLikes);

		} catch (e) {
			console.error(`Post >> ${e}`);
		}

	}

	let likeOrDislikeButton: React.ReactNode =
		postLikes &&
		postLikes.find((like: PostLikeProps) => like !== currentUserDocSnap) ?
		<MdFavoriteBorder onClick={handleLikeClick} /> :
		<MdFavorite onClick={handleLikeClick} />;

	const hashtagsCollection: React.ReactNode = hashtags.map((hashtag: QueryDocumentSnapshot<DocumentData>, key: number) => {
		return <S.PostHashtag to={`/hashtag/${hashtag}`} key={key}><span>#{hashtag}</span></S.PostHashtag>;
	});


	return(
		<S.Post>
			<S.PostBody>{body}</S.PostBody>
			<S.PostHashtagHolder>{hashtagsCollection}</S.PostHashtagHolder>
			<S.LikeArea>
				<S.PostLikes>Liked by <b>{postLikes ? postLikes?.length : 0}</b> people</S.PostLikes>
				<S.PostLikeDislikeButton>{likeOrDislikeButton}</S.PostLikeDislikeButton>
			</S.LikeArea>
		</S.Post>
	);

}

export default Post;
