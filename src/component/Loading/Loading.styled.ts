import styled from "styled-components";

export const Holder = styled.div`
	position		: fixed;
	left			: 0;
	right			: 0;
	top				: ${props => props.theme.size.topNavigationBarMobile}px;
	bottom			: ${props => props.theme.size.bottomNavigationBarMobile}px;
	@media (min-width: ${props => props.theme.size.container + (props.theme.size.distanceHuge)}px) {
		top			: ${props => props.theme.size.desktopNavigationBar}px;
		bottom		: 0px;
	}
	display			: flex;
	justify-content	: center;
    align-items		: center;
	background		: ${props => props.theme.color.darkCover};
	font-size		: 100px;
`;

