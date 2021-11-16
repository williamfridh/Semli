import { FunctionComponent } from "react";
import { ResponseListProps, ResponseProps } from "shared/types";
import * as StyledResponseList from './ResponseList.styled';



const ResponseList: FunctionComponent<ResponseListProps> = ({ list }): JSX.Element=> {

	const responseCollection: React.ReactNode = list.map((responseObj: ResponseProps, key: number) => {
		const {body, type} = responseObj;
		return <StyledResponseList.Response type={type} key={key}>{body}</StyledResponseList.Response>;
	});

	return <>{responseCollection}</>;

}

export default ResponseList;

