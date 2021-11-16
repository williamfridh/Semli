import styled, { css } from 'styled-components';

/**
 * Interfaces.
 */
interface HolderInterface {
	margin					?: string;
}
interface LetterInterface {
	size					: number;
}

export const Holder = styled.div<HolderInterface>`
	display					: flex;
	align-items				: center;
	${({margin}) => margin && css`
		margin				: ${margin};
	`};
`;

export const Letter = styled.span<LetterInterface>`
	color					: #000;
	font-weight				: 700;
	background-color		: #fff;
	text-align				: center;
	
	// Size.
	font-size				: 140%;
	width					: 30px;
	line-height				: 30px;
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

