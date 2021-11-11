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
	background				: ${props => props.theme.color.bar};
	display					: flex;
    justify-content			: space-between;
	padding					: 0 ${props => props.theme.size.distanceBig}px;
`;

export const Button = styled(NavLink)`
	text-decoration			: 'none';
	display					: inline-block;
	color					: ${props => props.theme.color.textBrightHigh};
	font-size				: 25px;
	display					: flex;
    align-items				: center;
`;

export const ButtonText = styled.span`
	display					: none;
`;

