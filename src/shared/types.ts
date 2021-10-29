import { DocumentData, DocumentReference, FieldValue, QueryDocumentSnapshot } from '@firebase/firestore';



/**
 * Types.
 */
export type NewPostDataProps = {
	body			: string,
	hashtags			: string[]|undefined,
	created			: FieldValue,
	user			: DocumentReference<DocumentData>
}
export type UpdatePostDataProps = {
	body			: string,
	hashtags			: string[]|undefined,
	created			: FieldValue,
	user			: DocumentReference<DocumentData>
}



export type NewUserDataProps = {
	id				: string,
	email			: string|null,
	created			: FieldValue,
	lastActive		: FieldValue
}
export type UpdateUserDataProps = {
	lastActive?		: FieldValue,
	username?		: string,
	bio?			: string
}
export type UserDependencyProps = {
	fallback?		: string,
	children		: JSX.Element,
}



export type ResponseProps = {
	body			: string,
	type			: 'success' | 'error'
}


export interface PostInterface {
	id?				: string;
	body			: QueryDocumentSnapshot<DocumentData>;
	hashtags			: QueryDocumentSnapshot<DocumentData>[];
	likes?			: PostLikeProps[];
}
export type PostProps = {
	id?				: string,
	body			: QueryDocumentSnapshot<DocumentData>,
	hashtags			: QueryDocumentSnapshot<DocumentData>[],
	likes?			: PostLikeProps[]
}
export type PostLikeProps = (QueryDocumentSnapshot<DocumentData>|DocumentReference<DocumentData>)

