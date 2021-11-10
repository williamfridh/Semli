import styled from 'styled-components';

export const Holder = styled.div`
	display					: flex;
	align-items				: center;
	margin					: auto;
`;

export const Letter = styled.span`
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