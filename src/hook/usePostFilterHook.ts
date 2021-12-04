import { OrderByDirection } from "@firebase/firestore";
import { useState } from "react";



/**
 * Types.
 */
 type usePostFilterHookType = (
	defaultFetchLimit		: number,
	defaultOrderByField		: string,
	defaultorderByDirection	: OrderByDirection
) => usePostFilterHookReturn;

type usePostFilterHookReturn = {
	fetchLimit			: number,
	setPostsLimit		: React.Dispatch<React.SetStateAction<number>>,
	orderByField		: string,
	setOrderByField		: React.Dispatch<React.SetStateAction<string>>,
	orderByDirection	: OrderByDirection
	setorderByDirection	: React.Dispatch<React.SetStateAction<OrderByDirection>>,
}



/**
 * Post filter hook.
 */
const usePostFilterHook: usePostFilterHookType = (defaultFetchLimit, defaultOrderByField, defaultorderByDirection) => {

	// Filter state hooks.
	const [fetchLimit, setPostsLimit] 				= useState<number>(defaultFetchLimit);
	const [orderByField, setOrderByField] 			= useState<string>(defaultOrderByField);
	const [orderByDirection, setorderByDirection] 	= useState<OrderByDirection>(defaultorderByDirection);
	
	// Export hook content.
	return {
		fetchLimit,
		setPostsLimit,
		orderByField,
		setOrderByField,
		orderByDirection,
		setorderByDirection
	};
}

export default usePostFilterHook;

