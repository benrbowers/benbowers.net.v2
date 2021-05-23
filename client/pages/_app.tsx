import { ChakraProvider } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { AppProps } from 'next/app';
import { ThemeContext } from '../themes/theme';
import { CookiesProvider, useCookies } from 'react-cookie';

function MyApp({ Component, pageProps }: AppProps) {
	const [colorTheme, setColorTheme] = useState('teal');
	const [cookies, setCookie] = useCookies(['colorTheme']);

	useEffect(() => {
		if (cookies.colorTheme && cookies.colorTheme !== colorTheme) {
			setColorTheme(cookies.colorTheme);
		}
	}, [cookies]);

	const changeColor = (color: string) => {
		setCookie('colorTheme', color, { path: '/', sameSite: 'lax' });
	};

	return (
		<CookiesProvider>
			<ThemeContext.Provider value={{ colorTheme, changeColor }}>
				<ChakraProvider resetCSS>
					<Component {...pageProps} />
				</ChakraProvider>
			</ThemeContext.Provider>
		</CookiesProvider>
	);
}

export default MyApp;