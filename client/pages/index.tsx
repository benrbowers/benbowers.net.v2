import { Flex, Heading, Text } from '@chakra-ui/react';
import Theme from '@chakra-ui/theme';
import Head from 'next/head';
import React, { useContext } from 'react';
import { Layout } from '../components/Layout';
import { ThemeContext } from '../themes/theme';

const Index = () => {
	const { colorTheme } = useContext(ThemeContext);

	return (
		<>
			<Head>
				<script type="module" src="/scripts/navBalls.js"></script>
			</Head>
			<canvas
				width={0}
				height={0}
				style={{ position: 'fixed', zIndex: -1 }}
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
					<Heading color="gray.500" fontSize="100px">
						Hi, I'm Ben!
					</Heading>
					<Text fontSize="50px" color="gray.500">
						A{' '}
						<span
							style={{
								color:
									Theme.colors[colorTheme as keyof typeof Theme.colors][500],
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
