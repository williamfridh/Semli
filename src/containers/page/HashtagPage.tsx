import { FunctionComponent } from "react";
import Posts from "../../component/Posts";
import { Redirect, useParams } from "react-router";
import { HashtagName } from "../../shared/types";
import HashtagData from "../../component/HashtagData";
import * as S from '../../shared/globalStyles';

const HashtagPage: FunctionComponent = (): JSX.Element => {

  	const { hashtagName }: {hashtagName?: HashtagName} = useParams();

	if (!hashtagName) {
		return <Redirect to="error/404" />;
	}

	return(
		<S.Page>
			<S.Title>#{hashtagName}</S.Title>
			<HashtagData hashtagName={hashtagName} />
			<Posts hashtagName={hashtagName} />
		</S.Page>
	);

}

export default HashtagPage;

