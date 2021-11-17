import { FunctionComponent, useState } from "react";
import { useFirebase } from "context/FirebaseContext";
import { HandleSearchTermInterface, HashtagProps } from "shared/types";
import * as SC from 'component/StyledComponents';
import SvgLoadingDark from "component/icon/LoadingDark";
import useSearchFormHook from "hook/useSearchFormHook";
import { Redirect } from "react-router";

const SearchForm: FunctionComponent = () => {

	const { firestoreDatabase } = useFirebase();
	const {
		isLoading,
		errorCode,
		searchResult,
		handleSearchTermChange,
		searchTerm
	} = useSearchFormHook(firestoreDatabase);

	if (errorCode) return <Redirect to={`/error/${errorCode}`} />;

	return (
		<>
			<SC.InputHolder>
				<SC.Input type="text" onChange={handleSearchTermChange} value={searchTerm} placeholder="Search for hashtags" />
				{isLoading && <SC.InputLoading><SvgLoadingDark /></SC.InputLoading>}
			</SC.InputHolder>
			{searchResult && searchResult.map((obj: HashtagProps, key: number) => {
				const {name, amount} = obj;
				return <SC.SeachFormResult to={`/hashtag/${name}`} key={key}>#{name} ({amount})</SC.SeachFormResult>;
			})}
		</>
	);

}

export default SearchForm;

