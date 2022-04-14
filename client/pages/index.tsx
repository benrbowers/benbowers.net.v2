import { Center, Flex, Heading, Text } from '@chakra-ui/react';
import Theme from '@chakra-ui/theme';
import Head from 'next/head';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Layout } from '../components/Layout';
import { ThemeContext } from '../themes/theme';
import { initHomePageBalls } from '../scripts/initHomePageBalls.js';
import { Engine } from '../scripts/bouncejs/Engine';

const Index = () => {
	const [screenSize, getDimension] = useState({
		width: 0,
		height: 0,
	});

	const setDimension = () => {
		getDimension({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	};
	const { colorTheme } = useContext(ThemeContext);

	let engine: Engine;

	// First render
	useEffect(() => {
		setDimension();
		window.addEventListener('resize', setDimension);

		requestAnimationFrame(() => {
			engine = initHomePageBalls();
		});

		return () => {
			engine?.stop();
			window.removeEventListener('resize', setDimension);
		};
	}, []);

	const textSize = useMemo(() => {
		return Math.sqrt(screenSize.width * screenSize.height) * 0.1 + 'px';
	}, [screenSize]);

	return (
		<>
			<Head>
				<meta
					name="google-site-verification"
					content="JqTop4MmVFuGkOXxeKkOBcflDqHbhmvHdcnJoN75kdo"
				/>
				<title>Ben's Portfolio</title>
			</Head>
			<Layout>
				<canvas
					width={0}
					height={0}
					style={{ position: 'fixed', zIndex: -1, top: 0 }}
				></canvas>
				<Center
					width={textSize}
					height={textSize}
					fontSize={['md', 'xl', '2xl', '3xl', '4xl']}
					textAlign="center"
					color="white"
					pos="fixed"
					left={0}
					top={0}
					className="grabMeText"
				></Center>
				<Flex
					flexDir="column"
					alignItems="center"
					bgColor="whiteAlpha.700"
					width="fit-content"
					mt="100px"
					mx="auto"
				>
					<Heading color="gray.500" fontSize={['55px', '80px', '100px']}>
						Hi, I'm Ben!
					</Heading>
					<Text
						fontSize={['25px', '40px', '50px']}
						color="gray.500"
						textAlign="center"
					>
						A{' '}
						<span
							style={{
								color:
									Theme.colors[colorTheme as keyof typeof Theme.colors][400],
							}}
						>
							web developer
						</span>{' '}
						with a passion for building.
					</Text>
				</Flex>
			</Layout>
		</>
	);
};

export default Index;
