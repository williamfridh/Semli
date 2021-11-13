import { getDoc, updateDoc, query, where, collection, getDocs, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { FunctionComponent, useEffect, useState } from "react";
import { Redirect } from "react-router";
import ResponseList from "component/ResponseList";
import { ifProfileComplete, useFirebase } from "context/FirebaseContext";
import { ResponseProps, UpdateUserDataProps } from "shared/types";
import * as SC from 'component/StyledComponents';
import Loading from "component/Loading";

/**
 * Form to complete account.
 * 
 * This can be shown when a users signs in for the first time, or when new data is required.
 * 
 * @returns either a redirection to the users profile, or a form to complete the account.
 */
const CompleteProfileForm: FunctionComponent = (): JSX.Element => {

	const {
		currentUser,
		firestoreDatabase,
		currentUserDocSnap,
		setCurrentUserDocSnap,
		currentUserDocRef
	} = useFirebase();

	const [username, setUsername] 		= useState('');
	const [bio, setBio] 				= useState('');
	const [isComplete, setIsComplete] 	= useState(false);
	const [isLoading, setIsLoading] 	= useState(false);
	const [response, setResponse] 		= useState([] as ResponseProps[]);

	/**
	 * handle username content change.
	 * 
	 * @param e - event to track.
	 */
	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setUsername(e.target.value);
	}

	/**
	 * Handle bio change.
	 * 
	 * @param e - event to track.
	 */
	const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
		setBio(e.target.value);
	}

	/**
	 * Handle post click.
	 * 
	 * Assemble the new post data and create a new doc in firestoreDatabase.
	 */
	const handlePostClick = async (): Promise<void> => {

		if (!currentUser) {
			return;
		}

		setIsLoading(true);

		try {

			let newResponse: ResponseProps[] = [];

			/**
			 * Check input.
			 */
			if (username.length < 4) {
				newResponse.push({body: 'Usernames must be minmum 4 characters long.', type: 'error'});
			}
			if (bio.length < 10) {
				newResponse.push({body: 'Bio must be minmum 10 characters long.', type: 'error'});
			}
			if (newResponse.length) {
				setResponse(newResponse);
				return;
			}

			const q = query(collection(firestoreDatabase, "users"), where("username", "==", username), where("id", "!=", currentUser.uid));
			const qSnapshop = await getDocs(q);

			qSnapshop.forEach((obj: QueryDocumentSnapshot<DocumentData>) => {
				const foundUsername = obj.data()['username'];
				if (foundUsername === username)  {
					setResponse([{body: 'Username already in use.', type: 'error'}]);
					return;
				}
			});

			/**
			 * Target, get and check if user doc exists.
			 */
			const currentUserDocSnap = currentUserDocRef && await getDoc(currentUserDocRef);
			const currentUserDocExists = currentUserDocSnap && currentUserDocSnap.exists();
	
			if (currentUserDocExists) {
				
				/**
				 * Update user doc.
				 */
				try {
					
					const updatedUserData: UpdateUserDataProps = {
						username,
						bio
					};
		
					await updateDoc(currentUserDocRef, updatedUserData);

					// Update data.
					const currentUserDocSnap = await getDoc(currentUserDocRef);
					setCurrentUserDocSnap && setCurrentUserDocSnap(currentUserDocSnap);

				} catch (e) {
					console.error("Error adding document: ", e);
				}
				
			}

		} catch (e) {
			console.error(`CompleteProfileForm >> ${e}`);
		}

		setIsLoading(false);

	}

	useEffect(() => {
		if (ifProfileComplete(currentUserDocSnap)) {
			setIsComplete(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUserDocSnap]);

	if (isComplete) {
		return <Redirect to={`/profile/${currentUser?.uid}`} />;
	}

	return(
		<div className="form">
			<SC.Row><SC.Input type="text" onChange={handleUsernameChange} value={username} placeholder="Username*" /></SC.Row>
			<SC.Row><SC.Textarea onChange={handleBioChange} value={bio} placeholder="I love cats, code, and...*" /></SC.Row>
			<SC.Row><SC.Button primary onClick={handlePostClick}><SC.ButtonText>Save</SC.ButtonText></SC.Button></SC.Row>
			{response && <SC.Row><ResponseList list={response} /></SC.Row>}
			{isLoading && <Loading/>}
		</div>
	);
	
}

export default CompleteProfileForm;

