import { NavLink } from "react-router-dom";
import Posts from "../../component/Posts";

const FeedPage = () => {

	return(
		<div className="page">
			<h1>Feed</h1>
			<NavLink to={`/post/create`}><button>Create Post</button></NavLink>
			<Posts />
		</div>
	);

}

export default FeedPage;

