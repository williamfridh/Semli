import { useParams } from "react-router";
import Posts from "../../component/Posts";
import Profile from "../../component/Profile";



/**
 * Types.
 */
type ProfilePageParamsProps = {
	uid: string;
}



/**
 * User profile page element.
 * 
 * @param props - includes a user id to be sent to a profile element.
 * @returns a profile page element.
 */
const ProfilePage = () => {

	/**
	 * Setup.
	 */
  	const { uid }: ProfilePageParamsProps = useParams();



	/**
	 * Main content.
	 */
	return(
		<div className="page">
			<Profile uid={uid} />
			<Posts uid={uid} />
		</div>
	);
	
}

export default ProfilePage;

