import styled from 'styled-components';

export const Holder = styled.nav`
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