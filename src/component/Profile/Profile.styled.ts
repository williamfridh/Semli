import styled from "styled-components";

export const Pic = styled.div`
	text-align		: center;
	& > img {
		max-height	: 25vh;
	}
`;

export const Bio = styled.div`
	line-height		: 150%;
	color			: #fff;
	font-size		: 100%;
	text-align		: center;
	padding			: 0 ${props => props.theme.size.distanceHuge}px ${props => props.theme.size.distanceBig}px;
`;

