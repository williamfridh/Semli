import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Bar = styled.nav`
	position		: fixed;
	bottom			: 0;
	left			: 0;
	right			: 0;
	height			: ${props => props.theme.size.topNavigationBarMobile}px;
	@media (min-width: ${props => props.theme.size.container + (props.theme.size.distanceHuge)}px) {
		display: none;
	}
`;

export const Container = styled.div`
	height			: 100%;
	background		: ${props => props.theme.color.bar};
	display			: flex;
    justify-content	: space-evenly;
`;

export const Button = styled(NavLink)`
	text-decoration	: 'none';
	display			: inline-block;
	color			: ${props => props.theme.color.textBrightHigh};
	font-size		: 200%;
	display			: flex;
    align-items		: center;
`;

