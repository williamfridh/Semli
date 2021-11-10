import { FunctionComponent } from "react";
import { ResponseListProps, ResponseProps } from "shared/types";
import * as StyledResponseList from './ResponseList.styled';


const ResponseList: FunctionComponent<ResponseListProps> = (props): JSX.Element=> {

	const { list } = props;

	const responseCollection: React.ReactNode = list.map((obj: ResponseProps, key: number) => {
		const {body, type} = obj;
		return <StyledResponseList.Response type={type} key={key}>{body}</StyledResponseList.Response>;
	});

	return <div className="response-list">{responseCollection}</div>;

}

export default ResponseList;

