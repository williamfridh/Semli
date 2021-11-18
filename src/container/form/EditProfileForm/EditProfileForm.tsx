import { FunctionComponent } from "react";
import ResponseList from "component/ResponseList";
import { useFirebase } from "context/FirebaseContext";
import * as SC from 'component/StyledComponents';
import Loading from "component/Loading";
import useEditProfileFormHook from "./useEditProfileFormHook";



/**
 * Form to complete account.
 * 
 * This can be shown when a users signs in for the first time, or when new data is required.
 * 
 * @returns either a redirection to the users profile, or a form to complete the account.
 */
const EditProfileForm: FunctionComponent = (): JSX.Element => {

	const {
		firestoreDatabase,
		currentUserDocSnap,
		setCurrentUserDocSnap
	} = useFirebase();

	const {
		handleProfilePicChange,
		profilePicPath,
		handleUsernameChange,
		username,
		handleBioChange,
		bio,
		handlePostClick,
		response,
		isLoading
	} = useEditProfileFormHook(firestoreDatabase, currentUserDocSnap, setCurrentUserDocSnap);

	return(
		<>
			<SC.Row><SC.Input type="file" onChange={handleProfilePicChange} value={profilePicPath} /></SC.Row>
			<SC.Row><SC.Input type="text" onChange={handleUsernameChange} value={username} placeholder="Username*" /></SC.Row>
			<SC.Row><SC.Textarea onChange={handleBioChange} value={bio} placeholder="I love cats, code, and...*" /></SC.Row>
			<SC.Row><SC.Button primary onClick={handlePostClick}><SC.ButtonText>Save</SC.ButtonText></SC.Button></SC.Row>
			{response && <SC.Row><ResponseList list={response} /></SC.Row>}
			{isLoading && <Loading/>}
		</>
	);
	
}

export default EditProfileForm;

