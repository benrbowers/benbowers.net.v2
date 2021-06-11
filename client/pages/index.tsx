import { Flex, Heading, Text } from '@chakra-ui/react';
import Theme from '@chakra-ui/theme';
import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { ThemeContext } from '../themes/theme';
import { initBallEngine } from '../scripts/initBallEngine.js';
import { Engine } from '../scripts/bouncejs/Engine';
import { useRouter } from 'next/router';

const Index = () => {
	const { colorTheme } = useContext(ThemeContext);

	const [hasLoaded, setHasLoaded] = useState(false);

	const [engine, setEngine] = useState(null as null | Engine);

	const router = useRouter();

	useEffect(() => {
		if (!hasLoaded) {
			setEngine(initBallEngine());
			setHasLoaded(true);
		}

		if (engine) {
			router.events.on('routeChangeStart', (url: string) => {
				if (url !== '/') {
					engine.stop();
				}
			});
		}
	});

	return (
		<>
			<Head>
				<meta
					name="google-site-verification"
					content="JqTop4MmVFuGkOXxeKkOBcflDqHbhmvHdcnJoN75kdo"
				/>
			</Head>
			<canvas
				width={0}
				height={0}
				style={{ position: 'fixed', zIndex: -1, transition: 'width 0.6s' }}
			></canvas>
			<Layout>
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
