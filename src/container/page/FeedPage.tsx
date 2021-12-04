import Posts from "component/Posts";
import * as SC from 'component/StyledComponents';
import usePostFilterHook from "hook/usePostFilterHook";
import { useEffect } from "react";



/**
 * Feed page.
 * 
 * @returns an element.
 */
const FeedPage = () => {

	const { fetchLimit, orderByField, orderByDirection } = usePostFilterHook(2, 'created', 'desc');

	useEffect(() => {
		document.title = `Feed`;
	}, [])

	return(
		<SC.Page>
			<SC.Title>Feed</SC.Title>
			<SC.Row><SC.NavigationLink to={`/post/create`}><SC.Button primary><SC.ButtonText>Create Post</SC.ButtonText></SC.Button></SC.NavigationLink></SC.Row>
			<Posts fetchLimit={fetchLimit} orderByField={orderByField} orderByDirection={orderByDirection} />
		</SC.Page>
	);

}

export default FeedPage;

