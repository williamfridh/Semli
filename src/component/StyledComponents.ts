import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';



/**
 * Containers.
 */
export const Container = styled.div`
	z-index		: 1;
	width		: 100%;
	max-width	: ${props => props.theme.size.container + (props.theme.size.distanceHuge)}px;
	margin		: 0 auto;
	padding		: ${props => props.theme.size.distanceBig}px;
`;

export const Page = styled(Container)`
	padding: ${props => props.theme.size.topNavigationBarMobile + props.theme.size.distanceBig}px ${props => props.theme.size.distanceBig}px ${props => props.theme.size.bottomNavigationBarMobile + props.theme.size.distanceBig}px;
`;

export const NavigationLink = styled(NavLink)`
	text-decoration	: none;
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
	border			: solid ${props => props.theme.border.width}px #E84545;
	background		: transparent;
	cursor			: pointer;
	transition		: ease .24s;
	border-radius	: ${props => props.theme.border.radius}px;
	display			: flex;
    align-items		: center;
    justify-content	: center;
	&:hover {
		border		: solid ${props => props.theme.border.width}px #fff;
		color		: #fff;
	}
	${({primary}) => primary && css`
		background	: ${props => props.theme.color.callToAction};
		color		: #fff;
		&:hover {
			border		: solid ${props => props.theme.border.width}px #903749;
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
	margin		: 0 ${props => props.theme.size.distanceMedium}px 0 0;
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
	padding		: ${props => props.theme.size.distanceBig}px ${props => props.theme.size.distanceHuge}px;
`;



/**
 * Inputs.
 */
export const Input = styled.input`
	width			: 100%;
	border-radius	: ${props => props.theme.border.radius}px;
	line-height		: 48px;
	font-size		: 16px;
	color			: #000;
	background		: #fff;
	border			: none;
	padding			: 0 ${props => props.theme.size.distanceBig}px;
	outline			: none;
`;
export const Textarea = styled.textarea`
	width			: 100%;
	border-radius	: ${props => props.theme.border.radius}px;
	line-height		: 48px;
	font-size		: 16px;
	color			: #000;
	background		: #fff;
	border			: none;
	padding			: 0 ${props => props.theme.size.distanceBig}px;
	outline			: none;
`;

