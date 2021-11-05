import CreatePostForm from "../form/CreatePostForm";
import * as S from '../../shared/globalStyles';

const CreatePostPage = () => {

	return(
		<S.Page>
			<S.Title>Create Post</S.Title>
			<CreatePostForm />
		</S.Page>
	);
	
}

export default CreatePostPage;

