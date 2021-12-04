import React from 'react';



/**
 * Types.
 */
export type HashtagProps = {
	name			: string|null,
	amount			: number|null
}
export type UserDependencyProps = {
	children		: React.ReactNode,
	fallback?		: string
}
export type ResponseProps = {
	body			: string,
	type			: 'success' | 'error'
}

