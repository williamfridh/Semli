import CreatePostForm from "container/form/CreatePostForm";
import * as SC from 'component/StyledComponents';

const CreatePostPage = () => {

	return(
		<SC.Page>
			<SC.Title>Create Post</SC.Title>
			<CreatePostForm />
		</SC.Page>
	);
	
}

export default CreatePostPage;

