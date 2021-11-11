import { Container } from 'component/StyledComponents';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Bar = styled.nav`
	position	: fixed;
	top			: 0;
	left		: 0;
	right		: 0;
	height		: ${props => props.theme.size.desktopNavigationBar}px;
	background	: ${props => props.theme.color.bar};
	display		: none;
	@media (min-width: ${props => props.theme.size.container + (props.theme.size.distanceHuge)}px) {
		display	: block;
	}
`;

export const FlexContainer = styled(Container)`
	display			: flex;
	justify-content	: space-between;
	height			: 100%;
`;

export const ButtonHolder = styled.div`
	display			: flex;
`;

export const Button = styled(NavLink)`
	text-decoration	: 'none';
	display			: inline-block;
	color			: ${props => props.theme.color.textBrightHigh};
	font-size		: 140%;
	display			: flex;
    align-items		: center;
	&:not(:first-child) {
		margin		: 0 0 0 ${props => props.theme.size.distanceBig}px;
	}
`;

