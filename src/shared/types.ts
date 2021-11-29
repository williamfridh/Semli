import { FieldValue } from 'firebase/firestore';
import React from 'react';



/**
 * Types.
 */
export type HashtagProps = {
	name			: string|null,
	amount			: number|null
}
export type UpdateUserDataProps = {
	username				?: string,
	bio						?: string,
	profilePicExists			?: boolean,
	profilePicExtension 	?: string
}
export type UserDependencyProps = {
	children		: React.ReactNode,
	fallback?		: string
}
export type ResponseProps = {
	body			: string,
	type			: 'success' | 'error'
}

