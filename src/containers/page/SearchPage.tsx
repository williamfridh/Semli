import { FunctionComponent } from "react";
import SearchForm from "../form/SearchForm";
import * as S from '../../shared/globalStyles';

const SearchPage: FunctionComponent = (): JSX.Element => {

	return(
		<S.Page>
			<S.Title>Search</S.Title>
			<SearchForm />
		</S.Page>
	);

}

export default SearchPage;

