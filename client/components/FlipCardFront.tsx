import { Box, BoxProps } from '@chakra-ui/layout';
import React from 'react';
import styled from 'styled-components';

type FlipCardFrontProps = BoxProps;

const StyledBox = styled(Box)`
	width: 100%;
	height: 100%;
	position: absolute;
	backface-visibility: hidden;
	border-radius: inherit;
	transform-style: preserve-3d;
`;

export const FlipCardFront: React.FC<FlipCardFrontProps> = ({
	children,
	...props
}) => {
	return <StyledBox {...props}>{children}</StyledBox>;
};
