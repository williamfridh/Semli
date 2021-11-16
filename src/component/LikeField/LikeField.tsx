import { DocumentData } from '@firebase/firestore';
import { useFirebase } from 'context/FirebaseContext';
import useLikeUnlike from 'hook/useLikeUnlike';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { PostLikeProps } from 'shared/types';
import * as StyledLikeField from './LikeField.styled';

interface LikeField {
	(
		postDocSnap				: DocumentData,
		currentUserDocSnap		: DocumentData
	): JSX.Element
}

const LikeField: LikeField = ({ postDocSnap, currentUserDocSnap }) => {

	const { firestoreDatabase } = useFirebase();

	const {likeAmount, handleClick, isLoading, likedByCurrentUser} = useLikeUnlike(postDocSnap, currentUserDocSnap, firestoreDatabase);

	const likeOrDislikeButton: JSX.Element = <span onClick={handleClick}>{likedByCurrentUser ? <MdFavorite /> : <MdFavoriteBorder />}</span>;

	return (
		<StyledLikeField.LikeArea>
			<StyledLikeField.Likes><span>Liked by <b>{likeAmount}</b> {likeAmount === 1 ? `person` : `people`}</span></StyledLikeField.Likes>
			{currentUserDocSnap && <StyledLikeField.LikeDislikeButton>{likeOrDislikeButton}</StyledLikeField.LikeDislikeButton>}
		</StyledLikeField.LikeArea>
	);

}

export default LikeField;

