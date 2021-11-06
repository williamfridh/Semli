import { FunctionComponent } from "react";
import SearchForm from "container/form/SearchForm";
import * as SC from 'component/StyledComponents';

const SearchPage: FunctionComponent = (): JSX.Element => {

	return(
		<SC.Page>
			<SC.Title>Search</SC.Title>
			<SearchForm />
		</SC.Page>
	);

}

export default SearchPage;

