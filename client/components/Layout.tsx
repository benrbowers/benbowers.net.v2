import { Box } from '@chakra-ui/layout';
import React from 'react';
import { NavBar } from './NavBar';
import { Settings } from './Settings';

// interface LayoutProps {};

export const Layout: React.FC = ({ children }) => {
	return (
		<Box pos="relative">
			<Settings animationDuration={0.6} />
			<NavBar className="navBar" width="fit-content" mx="auto" mb={3} mt={1} />
			{children}
		</Box>
	);
};
