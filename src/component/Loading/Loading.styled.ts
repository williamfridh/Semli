import styled from "styled-components";


export const Holder = styled.div`
	position		: fixed;
	top				: ${props => props.theme.size.topNavigationBarMobile}px;
	bottom			: ${props => props.theme.size.bottomNavigationBarMobile}px;
	left			: 0;
	right			: 0;
	display			: flex;
	justify-content	: center;
    align-items		: center;
	background		: ${props => props.theme.color.darkCover};
	font-size		: 100px;
`;

