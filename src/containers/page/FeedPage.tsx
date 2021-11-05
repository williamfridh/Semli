import Posts from "../../component/Posts";
import * as S from '../../shared/globalStyles';
import { MdAddCircleOutline } from 'react-icons/md';

const FeedPage = () => {

	return(
		<S.Page>
			<S.Title>Feed</S.Title>
			<S.NavigationButton primary to={`/post/create`} margin="0 0 16px 0"><S.ButtonIcon><MdAddCircleOutline /></S.ButtonIcon><S.ButtonText>Create Post</S.ButtonText></S.NavigationButton>
			<Posts />
		</S.Page>
	);

}

export default FeedPage;

