import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
	* {
		box-sizing	: border-box;
		margin		: 0;
		padding		: 0;
		font-family	: 'Source Sans Pro', sans-serif;
	}
	body {
		background	: #2B2E4A;
		font-size	: 14px;
	}
	html, body, #root {
		height: 100%;
	}
`;

