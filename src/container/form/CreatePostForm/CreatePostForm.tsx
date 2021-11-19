import { FunctionComponent } from "react";
import { Redirect } from "react-router";
import ResponseList from "component/ResponseList";
import { useFirebase } from "context/FirebaseContext";
import * as SC from 'component/StyledComponents';
import Loading from "component/Loading";
import useCreatePostFormHook from "container/form/CreatePostForm/useCreatePostFormHook";

const CreatePostForm: FunctionComponent = (): JSX.Element => {

	const { currentUserDocSnap, firestoreDatabase } = useFirebase();
	const {
		body,
		handleBodyChange,
		hashtags,
		handleHashtagChange,
		handlePostClick,
		isLoading,
		isComplete,
		response
	} = useCreatePostFormHook(currentUserDocSnap, firestoreDatabase);

	return(
		<>
			<SC.Row><SC.Textarea onChange={handleBodyChange} value={body} placeholder={`Type text here...*`} /></SC.Row>
			<SC.Row><SC.Textarea onChange={handleHashtagChange} value={hashtags} placeholder={`#example1 #example2 #example3*`} /></SC.Row>
			<SC.Row><SC.Button primary onClick={handlePostClick}><SC.ButtonText>Post</SC.ButtonText></SC.Button></SC.Row>
			{isLoading && <Loading/>}
			{isComplete && <Redirect to={`/`} />}
			{response && <SC.Row><ResponseList list={response} /></SC.Row>}
		</>
	);
	
}

export default CreatePostForm;

