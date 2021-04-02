import { Box, BoxProps } from '@chakra-ui/layout';
import React from 'react';
import styles from './FlipCard.module.css'

interface FlipCardFrontProps extends BoxProps {

};

export const FlipCardFront: React.FC<FlipCardFrontProps> = (props) => {
        return (
            <Box {...props} className={styles.flipCardFront}>
                {props.children}
            </Box>
        );
};