import { ChakraProvider } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { AppProps } from 'next/app';
import { ThemeContext } from '../themes/theme';
import { CookiesProvider, useCookies } from 'react-cookie';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
	const [cookies, setCookie] = useCookies(['colorTheme']);
	const [colorTheme, setColorTheme] = useState('cyan');

	if (cookies.colorTheme === undefined) {
		const yearFromNow = new Date();
		yearFromNow.setTime(yearFromNow.getTime() + 1000 * 3600 * 24 * 365); // 1 year from now
		setCookie('colorTheme', colorTheme, {
			path: '/',
			sameSite: 'lax',
			expires: yearFromNow,
		});
	}

	useEffect(() => {
		if (cookies.colorTheme && cookies.colorTheme !== colorTheme) {
			setColorTheme(cookies.colorTheme);
		}
	}, [cookies]);

	const changeColor = (color: string) => {
		const yearFromNow = new Date();
		yearFromNow.setTime(yearFromNow.getTime() + 1000 * 3600 * 24 * 365); // 1 year from now
		setCookie('colorTheme', color, {
			path: '/',
			sameSite: 'lax',
			expires: yearFromNow,
		});
	};

	const favicons = {
		cyan: 'ball-icon.png',
		red: 'ball-icon-red.png',
		green: 'ball-icon-green.png',
		blue: 'ball-icon-blue.png',
		purple: 'ball-icon-purple.png',
		pink: 'ball-icon-pink.png',
		messenger: 'ball-icon-messenger.png',
		whatsapp: 'ball-icon-whatsapp.png',
	};

	return (
		<>
			<Head>
				<link
					rel="icon"
					href={'/favicons/' + favicons[colorTheme as keyof typeof favicons]}
				/>
			</Head>
			<CookiesProvider>
				<ThemeContext.Provider value={{ colorTheme, changeColor }}>
					<ChakraProvider resetCSS>
						<Component {...pageProps} />
					</ChakraProvider>
				</ThemeContext.Provider>
			</CookiesProvider>
		</>
	);
}

export default MyApp;
