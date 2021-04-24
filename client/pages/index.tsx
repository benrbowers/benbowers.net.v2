import { Layout } from '../components/Layout';
import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';

const Canvas = styled.canvas`
	position: fixed;
	z-index: -100;
`;

const Index = () => (
	<>
		<Head>
			<script type="module" src="/scripts/navBalls.js"></script>
		</Head>
		<Canvas></Canvas>
		<Layout></Layout>
	</>
);

export default Index;
