import { NavLink } from 'react-router-dom';
import styled, { createGlobalStyle, css } from 'styled-components';



/**
 * Global stuff.
 */
const GlobalStyle = createGlobalStyle`
	* {
		box-sizing	: border-box;
		margin		: 0;
		padding		: 0;
		font-family	: 'Source Sans Pro', sans-serif;
	}
	body {
		background	: #2B2E4A;
	}
`;



/**
 * Containers.
 */
export const Container = styled.div`
	z-index		: 1;
	width		: 100%;
	margin		: 0 auto;
	padding		: 16px;
`;

export const Page = styled(Container)`
`;



/**
 * Button
 */
 interface TitleProps {
	readonly primary?: boolean;
	readonly margin?: string;
	readonly to?: string;
};
export const Button = styled.button<TitleProps>`
	width			: 100%;
	line-height		: 40px;
	color			: #E84545;
	border			: solid 2px #E84545;
	background		: transparent;
	cursor			: pointer;
	transition		: ease .24s;
	border-radius	: 8px;
	text-decoration	: none;
	display			: flex;
    align-items		: center;
    justify-content	: center;
	&:hover {
		border		: solid 2px #fff;
		color		: #fff;
	}
	${({primary}) => primary && css`
		background	: ${props => props.theme.color.callToAction};
		color		: #fff;
		&:hover {
			border		: solid 2px #903749;
			background	: #903749;
		}
	`};
	${({margin}) => margin && css`
		margin: ${margin};
	`};
`;
export const NavigationButton = styled(NavLink)<TitleProps>`
	width			: 100%;
	line-height		: 40px;
	color			: #E84545;
	border			: solid 2px #E84545;
	background		: transparent;
	cursor			: pointer;
	transition		: ease .24s;
	border-radius	: 8px;
	text-decoration	: none;
	display			: flex;
	align-items		: center;
	justify-content	: center;
	&:hover {
		border		: solid 2px #fff;
		color		: #fff;
	}
	${({primary}) => primary && css`
		background	: #E84545;
		color		: #fff;
		&:hover {
			border		: solid 2px #903749;
			background	: #903749;
		}
	`};
	${({margin}) => margin && css`
		margin: ${margin};
	`};
`;

export const ButtonIcon = styled.span`
	font-size	: 30px;
	display		: flex;
    align-items	: center;
	margin		: 0 8px 0 0;
`;

export const ButtonText = styled.span`
	font-size	: 18px;
	font-weight	: 700;
`;



/**
 * Headings.
 */
export const Title = styled.h1`
	text-align	: center;
	color		: #ffffff;
	padding		: 16px 32px;
`;



/**
 * Inputs.
 */
export const Input = styled.input`
	width			: 100%;
	border-radius	: 8px;
	line-height		: 48px;
	font-size		: 16px;
	color			: #000;
	background		: #fff;
	border			: none;
	padding			: 0 16px;
	outline			: none;
`;



export default GlobalStyle;

