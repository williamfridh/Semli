import { FunctionComponent, useState } from "react";
import { useFirebase } from "context/FirebaseContext";
import { HandleSearchTermInterface, HashtagProps } from "shared/types";
import * as SC from 'component/StyledComponents';
import SvgLoadingDark from "component/icon/LoadingDark";
import useSearch from "hook/useSearch";
import { Redirect } from "react-router";

const SearchForm: FunctionComponent = () => {

	const [term, setTerm] 			= useState('');
	const { firestoreDatabase } 	= useFirebase();
	const {
		isLoading,
		errorCode,
		searchResult
	} = useSearch(firestoreDatabase, term);

	const handleTermChange: HandleSearchTermInterface = e => {

		const newTerm = e.target.value
			.replaceAll('#', '')
			.replaceAll('å', 'a')
			.replaceAll('ä', 'a')
			.replaceAll('ö', 'o')
			.replaceAll(' ', '')
			.toLowerCase();

		setTerm(newTerm);
	}

	if (errorCode) {
		return <Redirect to={`/error/${errorCode}`} />;
	}

	return (
		<>
			<SC.InputHolder>
				<SC.Input type="text" onChange={handleTermChange} value={term} placeholder="Search for hashtags" />
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

