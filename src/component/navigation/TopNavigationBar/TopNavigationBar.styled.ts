import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Bar = styled.nav`
	position				: fixed;
	top						: 0;
	left					: 0;
	right					: 0;
	height					: ${props => props.theme.size.bottomNavigationBarMobile}px;
	@media (min-width: ${props => props.theme.size.container + (props.theme.size.distanceHuge)}px) {
		display				: none;
	}
`;

export const Container = styled.div`
	height					: 100%;
	background				: #000;
	display					: flex;
    justify-content			: space-between;
	padding					: 0 ${props => props.theme.size.distanceBig}px;
`;

export const Button = styled(NavLink)`
	text-decoration			: 'none';
	display					: inline-block;
	color					: #fff;
	font-size				: 25px;
	display					: flex;
    align-items				: center;
`;

export const ButtonText = styled.span`
	display					: none;
`;

export const Logo = styled.div`
	display					: flex;
	align-items				: center;
	margin					: auto;
`;

export const LogoLetter = styled.span`
	color					: #000;
	font-size				: 26px;
	font-weight				: 700;
	background-color		: #fff;
	width					: 30px;
	line-height				: 30px;
	text-align				: center;
	&:not(:first-child) {
		margin: 0 0 0 6px;
	}
`;
