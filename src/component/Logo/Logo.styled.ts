import styled, { css } from 'styled-components';

interface HolderInterface {
	margin					?: string;
}
export const Holder = styled.div<HolderInterface>`
	display					: flex;
	align-items				: center;
	${({margin}) => margin && css`
		margin				: ${margin};
	`};
`;

interface LetterInterface {
	size					: number;
}
export const Letter = styled.span<LetterInterface>`
	color					: #000;
	font-size				: 140%;
	font-weight				: 700;
	background-color		: #fff;
	width					: 30px;
	line-height				: 30px;
	text-align				: center;
	&:not(:first-child) {
		margin				: 0 0 0 6px;
	}
	
	${({size}) => size && css`
		font-size				: ${size * 140}%;
		width					: ${size * 30}px;
		line-height				: ${size * 30}px;
		&:not(:first-child) {
			margin				: 0 0 0 ${size * 6}px;
		}
	`};
`;

