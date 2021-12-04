import { useParams } from "react-router";
import Posts from "component/Posts";
import Profile from "component/Profile";
import * as SC from 'component/StyledComponents';
import usePostFilterHook from "hook/usePostFilterHook";
import { useEffect } from "react";



/**
 * Types.
 */
type ProfilePageParamsProps = {
	uid: string;
}



/**
 * User profile page.
 * 
 * @param props - includes a user id to be sent to a profile element.
 * @returns an element.
 */
const ProfilePage = () => {

	const { fetchLimit, orderByField, orderByDirection } = usePostFilterHook(2, 'created', 'desc');
  	const { uid }: ProfilePageParamsProps = useParams();

	useEffect(() => {
		document.title = `Profile`;
	}, [])

	return(
		<SC.Page>
			<Profile uid={uid} />
			<Posts uid={uid} fetchLimit={fetchLimit} orderByField={orderByField} orderByDirection={orderByDirection} />
		</SC.Page>
	);
	
}

export default ProfilePage;

