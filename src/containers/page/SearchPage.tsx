import { FunctionComponent } from "react";
import SearchForm from "../form/SearchForm";

const SearchPage: FunctionComponent = (): JSX.Element => {

	return(
		<div className="page">
			<h1>Search</h1>
			<SearchForm />
		</div>
	);

}

export default SearchPage;

