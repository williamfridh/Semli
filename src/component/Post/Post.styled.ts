import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
	background		: #1a1b2d;
	padding			: ${props => props.theme.size.distanceBig}px;
	border-radius	: ${props => props.theme.border.radius}px;
	&:not(:first-child) {
		margin		: ${props => props.theme.size.distanceBig}px 0 0 0;
	}
`

export const Body = styled.div`
	color			: #fff;
	line-height		: 150%;
`;

export const HashtagHolder = styled.div`
	margin			: ${props => props.theme.size.distanceMedium}px 0 0 0;
`;

export const Hashtag = styled(NavLink)`
	color			: #E84545;
	font-size		: 80%;
	text-decoration	: none;
	border			: solid 1px #E84545;
	border-radius	: ${props => props.theme.border.radius}px;
	padding			: ${props => props.theme.size.distanceSmall}px ${props => props.theme.size.distanceMedium}px;
	display			: inline-block;
	margin			: 0 ${props => props.theme.size.distanceMedium}px ${props => props.theme.size.distanceMedium}px 0;
`;

export const Likes = styled.div`
	color			: ${props => props.theme.color.textBrightMedium};
	display			: flex;
	align-items		: flex-end;
`;

export const LikeDislikeButton = styled.div`
	color			: #fff;
	font-size		: 200%;
	display			: flex;
	justify-content	: flex-end;
`;

export const LikeArea = styled.div`
	display					: grid;
	grid-template-columns	: auto auto;
	font-size				: 80%;
`;

interface UsernameProps {
	to						: string;
}
export const Username = styled(NavLink)<UsernameProps>`
	text-decoration			: none;
	color					: ${props => props.theme.color.textBrightHigh};
	font-weight				: 700;
	font-size				: 100%;
	grid-column				: 2;
`;
export const Timestamp = styled.div`
	color					: ${props => props.theme.color.textBrightMedium};
	font-size				: 80%;
	grid-column				: 2;
`;
export const By = styled.div`
	margin					: 0 0 ${props => props.theme.size.distanceMedium}px 0;
	display					: grid;
	grid-template-columns	: min-content auto;
	grid-column-gap			: ${props => props.theme.size.distanceMedium}px;
`;
export const ByData = styled.div`
`;
export const Avatar = styled.div`
	height			: ${props => props.theme.size.distanceHuge}px;
	width			: ${props => props.theme.size.distanceHuge}px;
	overflow		: hidden;
	grid-column		: 1;

	& > img {
		max-height	: 100%;
		max-width	: 100%;
	}
	
`;

