import { Layout } from '../components/Layout';
import React, { useContext } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { ThemeContext } from '../themes/theme';
import Theme from '@chakra-ui/theme';

const Canvas = styled.canvas`
	position: fixed;
	z-index: -100;
`;

const Index = () => {
	const { colorTheme } = useContext(ThemeContext);
	return (
		<>
			<Head>
				<script type="module" src="/scripts/navBalls.js"></script>
			</Head>
			<Canvas></Canvas>
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
