import { FunctionComponent } from "react";
import { ResponseProps } from "shared/types";
import * as StyledResponseList from './ResponseList.styled';



/**
 * Types.
 */
type ResponseListProps = {
	list: ResponseProps[]
}



/**
 * Response list element.
 * 
 * @param list - an array contnaining reponse codes.
 * @returns a element.
 */
const ResponseList: FunctionComponent<ResponseListProps> = ({ list }): JSX.Element=> {

	const responseCollection: React.ReactNode = list.map((responseObj: ResponseProps, key: number) => {
		const {body, type} = responseObj;
		return <StyledResponseList.Response type={type} key={key}>{body}</StyledResponseList.Response>;
	});

	return <>{responseCollection}</>;

}

export default ResponseList;

