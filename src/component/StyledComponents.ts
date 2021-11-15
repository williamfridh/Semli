import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';



/**
 * Containers.
 */
export const Container = styled.div`
	z-index				: 1;
	width				: 100%;
	max-width			: ${props => props.theme.size.container + (props.theme.size.distanceHuge)}px;
	margin				: 0 auto;
	padding				: ${props => props.theme.size.distanceBig}px;
`;

export const Page = styled(Container)`
	padding: ${props => props.theme.size.topNavigationBarMobile + props.theme.size.distanceBig}px ${props => props.theme.size.distanceBig}px ${props => props.theme.size.bottomNavigationBarMobile + props.theme.size.distanceBig}px;
	@media (min-width: ${props => props.theme.size.container + (props.theme.size.distanceHuge)}px) {
		padding: ${props => props.theme.size.desktopNavigationBar + props.theme.size.distanceBig}px ${props => props.theme.size.distanceBig}px ${props => props.theme.size.distanceBig}px;
	}
`;

interface NavigationLinkProps {
	readonly to		: string;
};
export const NavigationLink = styled(NavLink)<NavigationLinkProps>`
	text-decoration		: none;
`;

export const Row = styled.div`
	margin				: 0 0 ${props => props.theme.size.distanceBig}px;
`;



/**
 * Button
 */
 interface ButtonProps {
	readonly primary?	: boolean;
	readonly margin?	: string;
};
export const Button = styled.button<ButtonProps>`
	width				: 100%;
	padding				: 0 ${props => props.theme.size.distanceBig}px;
	margin				: auto;
	line-height			: 40px;
	color				: #E84545;
	border				: solid ${props => props.theme.border.width}px #E84545;
	background			: transparent;
	cursor				: pointer;
	transition			: ease .24s;
	border-radius		: ${props => props.theme.border.radius}px;
	display				: flex;
    align-items			: center;
    justify-content		: center;
	&:hover {
		border			: solid ${props => props.theme.border.width}px #fff;
		color			: #fff;
	}
	${({primary}) => primary && css`
		background		: ${props => props.theme.color.callToAction};
		color			: #fff;
		&:hover {
			border		: solid ${props => props.theme.border.width}px #903749;
			background	: #903749;
		}
	`};
	${({margin}) => margin && css`
		margin			: ${margin};
	`};
	@media (min-width: ${props => props.theme.size.container + (props.theme.size.distanceHuge)}px) {
		width			: fit-content;
	}
`;

export const ButtonIcon = styled.span`
	font-size			: 180%;
	display				: flex;
    align-items			: center;
	margin				: 0 ${props => props.theme.size.distanceMedium}px 0 0;
`;

export const ButtonText = styled.span`
	font-size			: 100%;
`;



/**
 * Headings.
 */
export const Title = styled.h1`
text-align	: center;
color		: #ffffff;
padding		: ${props => props.theme.size.distanceBig}px ${props => props.theme.size.distanceHuge}px;
`;
export const SubTitle = styled.h4`
	text-align	: center;
	color		: #ffffff;
	padding		: 0 ${props => props.theme.size.distanceHuge}px ${props => props.theme.size.distanceBig}px;
`;



/**
 * Inputs.
 */
export const Input = styled.input`
	width			: 100%;
	border-radius	: ${props => props.theme.border.radius}px;
	line-height		: 48px;
	font-size		: 100%;
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
	font-size		: 100%;
	color			: #000;
	background		: #fff;
	border			: none;
	padding			: ${props => props.theme.size.distanceBig}px;
	outline			: none;
	line-height: 160%;
`;
export const InputHolder = styled.div`
	position		: relative;
`;
export const InputLoading = styled.div`
	position		: absolute;
	top				: 50%;
	right			: ${props => props.theme.size.distanceMedium}px;
	transform		: translate(0, -50%);
	font-size		: 180%;
`;



/**
 * Search form.
 */
interface SeachFormResultInterface {
	to				: string;
}
export const SeachFormResult = styled(NavLink)<SeachFormResultInterface>`
	color			: ${props => props.theme.color.textBrightHigh};
	font-size		: 100%;
	background		: ${props => props.theme.color.boxBackground};
	padding			: ${props => props.theme.size.distanceBig}px;
	margin			: ${props => props.theme.size.distanceMedium}px 0 0;
	border-radius	: ${props => props.theme.border.radius}px;
	text-decoration	: none;
	display			: block;
`;

