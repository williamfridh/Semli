import * as S from '../NavigationBar.styled';
import { useFirebase } from '../../../context/FirebaseContext';
import { MdHome, MdSettings, MdAccountCircle, MdOutlineSearch } from 'react-icons/md';

const OnlineOptions = () => {

	const { currentUser } = useFirebase();

	return (
		<S.NavigationBarContainer>
			<S.NavigationBarButton to={`/feed`}><MdHome /><S.NavigationBarButtonText>Feed</S.NavigationBarButtonText></S.NavigationBarButton>
			<S.NavigationBarButton to={`/search`}><MdOutlineSearch /><S.NavigationBarButtonText>Search</S.NavigationBarButtonText></S.NavigationBarButton>
			<S.NavigationBarButton to={`/settings`}><MdSettings /><S.NavigationBarButtonText>Settings</S.NavigationBarButtonText></S.NavigationBarButton>
			<S.NavigationBarButton to={`/profile/${currentUser?.uid}`}><MdAccountCircle /><S.NavigationBarButtonText>My Profile</S.NavigationBarButtonText></S.NavigationBarButton>
		</S.NavigationBarContainer>
	);

}

export default OnlineOptions;

