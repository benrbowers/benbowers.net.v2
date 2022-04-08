import { Flex, Heading, Text } from '@chakra-ui/react';
import Theme from '@chakra-ui/theme';
import Head from 'next/head';
import React, { useContext, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { ThemeContext } from '../themes/theme';
import { initHomePageBalls } from '../scripts/initHomePageBalls.js';
import { Engine } from '../scripts/bouncejs/Engine';

const Index = () => {
	const { colorTheme } = useContext(ThemeContext);

	let engine: Engine;

	useEffect(() => {
		engine = initHomePageBalls();

		return () => {
			engine.stop();
		};
	}, []);

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
