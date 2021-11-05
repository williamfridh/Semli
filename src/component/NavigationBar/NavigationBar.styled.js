import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const NavigationBar = styled.nav`
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 56px;
`;

export const NavigationBarContainer = styled.div`
	height: 100%;
	background: #000;
	display: flex;
    justify-content: space-evenly;
`;

export const NavigationBarButton = styled(NavLink)`
	text-decoration: 'none';
	display: inline-block;
	color: #fff;
	font-size: 25px;
	display: flex;
    align-items: center;
`;

export const NavigationBarButtonText = styled.span`
	display: none;
`;