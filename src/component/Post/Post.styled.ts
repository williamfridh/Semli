import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
	background		: #1a1b2d;
	padding			: 16px;
	border-radius	: 8px;
	&:not(:first-child) {
		margin		: 16px 0 0 0;
	}
`

export const Body = styled.div`
	color			: #fff;
	line-height		: 150%;
`;

export const HashtagHolder = styled.div`
	margin			: 16px 0;
`;

export const Hashtag = styled(NavLink)`
	color			: #E84545;
	font-size		: 14px;
	text-decoration	: none;
	border			: solid 1px #E84545;
	padding			: 4px 8px;
	&:not(:first-child) {
		margin		: 0 0 0 8px;
	}
`;

export const Likes = styled.div`
	color			: #fff;
`;

export const LikeDislikeButton = styled.div`
	color			: #fff;
	font-size		: 24px;
	display			: flex;
	justify-content	: flex-end;
`;

export const LikeArea = styled.div`
	display					: grid;
	grid-template-columns	: auto auto;
`;

