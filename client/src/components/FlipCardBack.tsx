import { Box, BoxProps } from '@chakra-ui/layout';
import React from 'react'
import styles from './FlipCard.module.css'

interface FlipCardBackProps extends BoxProps {

}

export const FlipCardBack: React.FC<FlipCardBackProps> = (props) => {
        return (
            <Box {...props} className={styles.flipCardBack}>
                {props.children}
            </Box>
        );
}