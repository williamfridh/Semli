import { FunctionComponent, useEffect } from "react";
import Posts from "component/Posts";
import { Redirect, useParams } from "react-router";
import HashtagData from "component/HashtagData";
import * as SC from 'component/StyledComponents';
import usePostFilterHook from "hook/usePostFilterHook";



/**
 * Types.
 */
type HashtagPageParams = {
	hashtagName ?: string
}



/**
 * Hashtag page.
 * 
 * @returns an element.
 */
const HashtagPage: FunctionComponent = (): JSX.Element => {

	const { fetchLimit, orderByField, orderByDirection } = usePostFilterHook(2, 'created', 'desc');
  	const { hashtagName }: HashtagPageParams = useParams();

	useEffect(() => {
		document.title = `#${hashtagName}`;
	}, [hashtagName])

	if (!hashtagName) return <Redirect to="error/404" />;

	return(
		<SC.Page>
			<SC.Title>#{hashtagName}</SC.Title>
			<HashtagData hashtagName={hashtagName} />
			<Posts hashtagName={hashtagName} fetchLimit={fetchLimit} orderByField={orderByField} orderByDirection={orderByDirection} />
		</SC.Page>
	);

}

export default HashtagPage;

