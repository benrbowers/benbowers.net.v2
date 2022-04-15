import { Center } from '@chakra-ui/react';
import Head from 'next/head';
import React, { useEffect, useMemo, useState } from 'react';
import { Layout } from '../components/Layout';
import { Engine } from '../scripts/bouncejs/Engine';
import { initHomePageBalls } from '../scripts/initHomePageBalls.js';

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

	const grabMeSize = useMemo(() => {
		return Math.sqrt(screenSize.width * screenSize.height * 0.01) + 'px';
	}, [screenSize]);
	const titleSize = useMemo(() => {
		return Math.sqrt(screenSize.width * screenSize.height * 0.07) + 'px';
	}, [screenSize]);
	const subtitleSize = useMemo(() => {
		return Math.sqrt(screenSize.width * screenSize.height * 0.05) + 'px';
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
					width={grabMeSize}
					height={grabMeSize}
					fontSize={['md', 'xl', '2xl', '3xl', '4xl']}
					textAlign="center"
					color="white"
					pos="fixed"
					left={0}
					top={0}
					pointerEvents="none"
					className="grabMeText"
				></Center>
				<Center
					width={titleSize}
					height={titleSize}
					fontSize={['3xl', '4xl', '5xl', '6xl', '7xl']}
					textAlign="center"
					color="white"
					pos="fixed"
					left={0}
					top={0}
					pointerEvents="none"
					className="title"
				>
					Hi, I'm Ben!
				</Center>
				<Center
					width={subtitleSize}
					height={subtitleSize}
					fontSize={['sm', 'lg', 'xl', '2xl', '3xl']}
					textAlign="center"
					color="white"
					pos="fixed"
					left={0}
					top={0}
					p="5px"
					pointerEvents="none"
					className="subtitle"
				>
					A frontend developer looking for his first full time role.
				</Center>
			</Layout>
		</>
	);
};

export default Index;
