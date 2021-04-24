import { Box } from '@chakra-ui/layout';
import React from 'react';
import { NavBar } from './NavBar';
import { Settings } from './Settings';

// interface LayoutProps {};

export const Layout: React.FC = ({ children }) => {
	return (
		<Box>
			<Settings animationDuration={0.6} />
			<NavBar width="fit-content" mx="auto" />
			{children}
		</Box>
	);
};
