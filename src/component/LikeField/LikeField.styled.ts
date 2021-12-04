import styled from 'styled-components';

export const Likes = styled.div`
	color			: ${props => props.theme.color.textBrightMedium};
	display			: flex;
	align-items		: flex-end;
`;

export const LikeDislikeButton = styled.div`
	color				: #fff;
	font-size			: 200%;
	display				: flex;
	justify-content		: flex-end;
`;

export const LikeArea = styled.div`
	display					: grid;
	grid-template-columns	: auto auto;
	font-size				: 80%;
`;

