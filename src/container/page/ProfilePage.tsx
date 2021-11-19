import { useParams } from "react-router";
import Posts from "component/Posts";
import Profile from "component/Profile";
import * as SC from 'component/StyledComponents';



/**
 * Types.
 */
type ProfilePageParamsProps = {
	uid				: string;
}



/**
 * User profile page element.
 * 
 * @param props - includes a user id to be sent to a profile element.
 * @returns a profile page element.
 */
const ProfilePage = () => {

  	const { uid }: ProfilePageParamsProps = useParams();

	return(
		<SC.Page>
			<Profile uid={uid} />
			<Posts uid={uid} />
		</SC.Page>
	);
	
}

export default ProfilePage;

