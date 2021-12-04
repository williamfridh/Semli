import { FunctionComponent, useEffect } from "react";
import SearchForm from "container/form/SearchForm";
import * as SC from 'component/StyledComponents';



/**
 * Search page.
 * 
 * @returns an element.
 */
const SearchPage: FunctionComponent = (): JSX.Element => {

	useEffect(() => {
		document.title = `Search`;
	}, [])

	return(
		<SC.Page>
			<SC.Title>Search</SC.Title>
			<SearchForm />
		</SC.Page>
	);

}

export default SearchPage;

