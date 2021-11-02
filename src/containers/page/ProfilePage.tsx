import { useParams } from "react-router";
import Posts from "../../component/Posts";
import Profile from "../../component/Profile";
import { ProfilePageParamsProps } from "../../shared/types";

/**
 * User profile page element.
 * 
 * @param props - includes a user id to be sent to a profile element.
 * @returns a profile page element.
 */
const ProfilePage = () => {

  	const { uid }: ProfilePageParamsProps = useParams();

	return(
		<div className="page">
			<Profile uid={uid} />
			<Posts uid={uid} />
		</div>
	);
	
}

export default ProfilePage;

