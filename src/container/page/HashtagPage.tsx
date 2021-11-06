import { FunctionComponent } from "react";
import Posts from "component/Posts";
import { Redirect, useParams } from "react-router";
import { HashtagName } from "shared/types";
import HashtagData from "component/HashtagData";
import * as SC from 'component/StyledComponents';

const HashtagPage: FunctionComponent = (): JSX.Element => {

  	const { hashtagName }: {hashtagName?: HashtagName} = useParams();

	if (!hashtagName) {
		return <Redirect to="error/404" />;
	}

	return(
		<SC.Page>
			<SC.Title>#{hashtagName}</SC.Title>
			<HashtagData hashtagName={hashtagName} />
			<Posts hashtagName={hashtagName} />
		</SC.Page>
	);

}

export default HashtagPage;

