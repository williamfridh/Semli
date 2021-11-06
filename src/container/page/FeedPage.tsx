import Posts from "component/Posts";
import * as SC from 'component/StyledComponents';
import { MdAddCircleOutline } from 'react-icons/md';

const FeedPage = () => {

	return(
		<SC.Page>
			<SC.Title>Feed</SC.Title>
			<SC.NavigationLink to={`/post/create`}><SC.Button primary margin="0 0 16px 0"><SC.ButtonIcon><MdAddCircleOutline /></SC.ButtonIcon><SC.ButtonText>Create Post</SC.ButtonText></SC.Button></SC.NavigationLink>
			<Posts />
		</SC.Page>
	);

}

export default FeedPage;

