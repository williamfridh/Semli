import * as S from '../NavigationBar.styled';
import { MdHome, MdAccountCircle } from 'react-icons/md';

const OnlineOptions = () => {

	return (
		<S.NavigationBarContainer>
			<S.NavigationBarButton to={`/`}><MdHome /><S.NavigationBarButtonText>Home</S.NavigationBarButtonText></S.NavigationBarButton>
			<S.NavigationBarButton to={`/log_in`}><MdAccountCircle /><S.NavigationBarButtonText>Log In</S.NavigationBarButtonText></S.NavigationBarButton>
		</S.NavigationBarContainer>
	);

}

export default OnlineOptions;

