import CreatePostForm from "container/form/CreatePostForm";
import * as SC from 'component/StyledComponents';
import { useEffect } from "react";



/**
 * Create post page.
 * 
 * @returns an element.
 */
const CreatePostPage = () => {

	useEffect(() => {
		document.title = `Create post`;
	}, [])

	return(
		<SC.Page>
			<SC.Title>Create Post</SC.Title>
			<CreatePostForm />
		</SC.Page>
	);
	
}

export default CreatePostPage;

