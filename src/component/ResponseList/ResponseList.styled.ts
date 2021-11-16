import styled, { css } from "styled-components";

interface ResponseProps {
	readonly type?		: string;
};
export const Response = styled.div<ResponseProps>`
	padding			: ${props => props.theme.size.distanceBig}px;
	border-radius	: ${props => props.theme.border.radius}px;
	color			: ${props => props.theme.color.textBrightHigh};
	
	&:not(:first-child) {
		margin: ${props => props.theme.size.distanceBig}px 0 0;
	}
	${({type}) => type && type === 'success' && css`
		background	: ${props => props.theme.color.success};
	`};
	${({type}) => type && type === 'error' && css`
		background	: ${props => props.theme.color.error};
	`};
`;

