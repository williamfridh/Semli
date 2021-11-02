import { FunctionComponent } from "react";
import Posts from "../../component/Posts";
import { Redirect, useParams } from "react-router";
import { HashtagName } from "../../shared/types";
import HashtagData from "../../component/HashtagData";

const HashtagPage: FunctionComponent = (): JSX.Element => {

  	const { hashtagName }: {hashtagName?: HashtagName} = useParams();

	if (!hashtagName) {
		return <Redirect to="error/404" />;
	}

	return(
		<div className="page">
			<h1>#{hashtagName}</h1>
			<HashtagData hashtagName={hashtagName} />
			<Posts hashtagName={hashtagName} />
		</div>
	);

}

export default HashtagPage;

