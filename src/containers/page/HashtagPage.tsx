import { FunctionComponent } from "react";
import Posts from "../../component/Posts";
import { useParams } from "react-router";



const HashtagPage: FunctionComponent = (): JSX.Element => {

  	const { hashtag }: {hashtag: string} = useParams();

	return(
		<div className="page">
			<h1>#{hashtag}</h1>
			<Posts hashtag={hashtag} />
		</div>
	);

}

export default HashtagPage;

