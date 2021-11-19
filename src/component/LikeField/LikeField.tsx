import { DocumentData, DocumentSnapshot } from '@firebase/firestore';
import { useFirebase } from 'context/FirebaseContext';
import useLikeHook from 'hook/useLikeHook';
import { FunctionComponent } from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import * as StyledLikeField from './LikeField.styled';



/**
 * Types.
 */
type LikeFieldProps = {
	postDocSnap				: DocumentSnapshot<DocumentData>,
	currentUserDocSnap		: DocumentSnapshot<DocumentData> | null
};


/**
 * Like field.
 * 
 * @param postDocSnap - post Firestore doc snap.
 * @param currentUserDocSnap - current user Firebase doc snap.
 * @returns a element called "like area" containing a like/unlike button and a like counter.
 */
const LikeField: FunctionComponent<LikeFieldProps> = ({ postDocSnap, currentUserDocSnap }) => {

	const { firestoreDatabase } = useFirebase();

	const {likeAmount, handleClick, likedByCurrentUser} = useLikeHook(postDocSnap, currentUserDocSnap, firestoreDatabase);

	const likeOrDislikeButton: JSX.Element = <span onClick={handleClick}>{likedByCurrentUser ? <MdFavorite /> : <MdFavoriteBorder />}</span>;

	return (
		<StyledLikeField.LikeArea>
			<StyledLikeField.Likes><span>Liked by <b>{likeAmount}</b> {likeAmount === 1 ? `person` : `people`}</span></StyledLikeField.Likes>
			{currentUserDocSnap && <StyledLikeField.LikeDislikeButton>{likeOrDislikeButton}</StyledLikeField.LikeDislikeButton>}
		</StyledLikeField.LikeArea>
	);

}

export default LikeField;

