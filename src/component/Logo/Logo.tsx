import { FunctionComponent } from 'react';
import { LogoProps } from 'shared/types';
import * as StyledLogo from './Logo.styled';

/**
 * Logo element.
 * 
 * @param props contains a size value (0-1).
 * @returns a JSX element that represents the logo.
 */
const Logo: FunctionComponent<LogoProps> = (props): JSX.Element => {

	let { size, margin } = props;

	size = size || 1;

	return(
		<StyledLogo.Holder margin={margin}>
			<StyledLogo.Letter size={size}>S</StyledLogo.Letter>
			<StyledLogo.Letter size={size}>E</StyledLogo.Letter>
			<StyledLogo.Letter size={size}>M</StyledLogo.Letter>
			<StyledLogo.Letter size={size}>L</StyledLogo.Letter>
			<StyledLogo.Letter size={size}>I</StyledLogo.Letter>
		</StyledLogo.Holder>
	);

}

export default Logo;

