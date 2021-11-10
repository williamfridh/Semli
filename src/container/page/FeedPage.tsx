import Posts from "component/Posts";
import * as SC from 'component/StyledComponents';

const FeedPage = () => {

	return(
		<SC.Page>
			<SC.Title>Feed</SC.Title>
			<SC.Row><SC.NavigationLink to={`/post/create`}><SC.Button primary><SC.ButtonText>Create Post</SC.ButtonText></SC.Button></SC.NavigationLink></SC.Row>
			<Posts />
		</SC.Page>
	);

}

export default FeedPage;

