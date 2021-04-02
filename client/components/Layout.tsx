import { Box } from '@chakra-ui/layout';
import React from 'react';
import { NavBar } from './NavBar';

interface LayoutProps {

};

export const Layout: React.FC<LayoutProps> = ({children}) => {
        return (
            <Box>
                <NavBar/>
                {children}
            </Box>
        );
};