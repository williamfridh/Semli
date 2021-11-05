import React, { FunctionComponent, useContext } from 'react';
import { ThemeContextProps } from '../shared/types';



/**
 * Create context.
 */
const ThemeContext = React.createContext<ThemeContextProps>({
	theme: {
		color: {
			background			: null,
			boxBackground		: null,
			inputBackground		: null,
			callToAction		: null,
			callToActionDark	: null,
			textBrightHigh		: null,
			textDarkHigh		: null
		}
	}
});



/**
 * Create a hook to the theme context.
 * 
 * @returns a context hook linked to the theme Context.
 */
export const useTheme = (): ThemeContextProps => {
	return useContext(ThemeContext);
}



/**
 * A theme provider to handle it's collected data.
 * 
 * @param props - children of the provider.
 * @returns an element that provides the theme.
 */
export const ThemeDataProvider: FunctionComponent = ({ children }) => {

	let value: ThemeContextProps;

	value = {
		theme: {
			color: {
				background			: '#2B2E4A',
				boxBackground		: '#1a1b2d',
				inputBackground		: '#fff',
				callToAction		: '#E84545',
				callToActionDark	: '#903749',
				textBrightHigh		: '#fff',
				textDarkHigh		: '#000'
			}
		}
	};

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;

}

