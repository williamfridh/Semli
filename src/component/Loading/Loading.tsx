import SvgLoadingBright from 'component/icon/LoadingBright';
import * as StyledLoading from './Loading.styled';

const Loading = () => {

	return(
		<StyledLoading.Holder>
			<SvgLoadingBright />
		</StyledLoading.Holder>
	);

}

export default Loading;

