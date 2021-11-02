import { FunctionComponent } from "react";
import { ResponseListProps, ResponseProps } from "../shared/types";



const ResponseList: FunctionComponent<ResponseListProps> = (props): JSX.Element=> {

	const { list } = props;

	const responseCollection: React.ReactNode = list.map((obj: ResponseProps, key: number) => {
		const {body, type} = obj;
		return <div className={`response `+type} key={key}>{body}</div>;
	});

	return <div className="response-list">{responseCollection}</div>;

}

export default ResponseList;

