import { ResponseProps } from "../shared/types";



/**
 * Types.
 */
type ResponseListProps = {
	list: ResponseProps[]
}



const ResponseList = (props: ResponseListProps) => {

	/**
	 *  Setup.
	 */
	const { list } = props;



	/**
	 * Main content.
	 */
	return(
		<div className="response-list">
			{list.map((obj: ResponseProps, key: number) => {
				const {body, type} = obj;
				return <div className={`response `+type} key={key}>{body}</div>;
			})}
		</div>
	);

}

export default ResponseList;

