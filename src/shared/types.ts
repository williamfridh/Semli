import { Auth, User } from 'firebase/auth';
import { DocumentData, DocumentReference, DocumentSnapshot, FieldValue, Firestore, QueryDocumentSnapshot } from 'firebase/firestore';
import React, { SetStateAction } from 'react';



/**
 * Types.
 */




/**
 * Types & .
 * 
 * To check if a user is online (on client side), check if currentUserDocSnap exists.
 */
 export type useFirebaseProps = {
	auth					: Auth,
	currentUser				: User|null,
	currentUserDocRef		: DocumentReference<DocumentData>|null,
	setCurrentUserDocRef	: React.Dispatch<React.SetStateAction<DocumentReference<DocumentData> | null>>|null,
	currentUserDocSnap		: DocumentSnapshot<DocumentData>|null,
	setCurrentUserDocSnap	: React.Dispatch<React.SetStateAction<DocumentSnapshot<DocumentData> | null>>|null,
	firestoreDatabase		: Firestore,
	firebaseIsloading		: boolean|null,
	setFirebaseIsloading	: React.Dispatch<React.SetStateAction<boolean>>|null
}

export type HashtagName = string|null;
export type HashtagProps = {
	name			: string|null,
	amount			: number|null
}
export type NewPostDataProps = {
	body			: string,
	hashtags		: HashtagName[]|null,
	created			: FieldValue,
	user			: DocumentReference<DocumentData>
}
export type UpdatePostDataProps = {
	body			: string,
	hashtags		: HashtagName[]|null,
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
	children		: React.ReactNode,
	fallback?		: string
}
export type ResponseProps = {
	body			: string,
	type			: 'success' | 'error'
}
export type PostProps = {
	id?				: string,
	body			: QueryDocumentSnapshot<DocumentData>,
	hashtags		: QueryDocumentSnapshot<DocumentData>[],
	likes?			: PostLikeProps[]
}
export type PostLikeProps = (QueryDocumentSnapshot<DocumentData>|DocumentReference<DocumentData>)


export type MenuObject = {
	text			: string,
	url				: string,
	userStatus		: string,
	icon			: string
}


export type ProfilePageParamsProps = {
	uid				: string;
}

export type PostsProps = {
	uid?			: string,
	hashtagName?	: string
}

export type ProfileProps =  {
	uid				: string
}

export type ResponseListProps = {
	list			: ResponseProps[]
}


export type ErrorPageParams = {
	code			: string
}

export type HashtagDataProps = {
	hashtagName: HashtagName
}



export type ThemeContextProps = {
	color: {
		background					: string,
		boxBackground				: string,
		inputBackground				: string,
		callToAction				: string,
		callToActionDark			: string,
		textBrightHigh				: string,
		textDarkHigh				: string
		darkCover					: string,
		bar							: string,
		success						: string,
		error						: string
	},
	size: {
		container					: number,
		distanceHuge				: number,
		distanceBig					: number,
		distanceMedium				: number,
		distanceSmall				: number,
		topNavigationBarMobile		: number,
		bottomNavigationBarMobile	: number,
		desktopNavigationBar		: number
	},
	border: {
		radius						: number,
		width						: number
	}
};

export interface SaveHashtagInterface {
	(
		hashtag: HashtagName,
		newPostDocRef: DocumentReference<DocumentData>
	): Promise<void>
}


export interface LogOutInterface {
	(
		auth: Auth,
		setCurrentUserDocRef: React.Dispatch<React.SetStateAction<DocumentReference<DocumentData> | null>>|null,
		setCurrentUserDocSnap: React.Dispatch<React.SetStateAction<DocumentSnapshot<DocumentData> | null>>|null,
		firebaseIsloading		: boolean|null,
		setFirebaseIsloading	: React.Dispatch<React.SetStateAction<boolean>>|null
	): Promise<void>
}



export interface HandleSearchInterface {
	(
		e: React.ChangeEvent<HTMLInputElement>
	): Promise<void>
}