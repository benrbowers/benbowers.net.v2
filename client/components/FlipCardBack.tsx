import { BoxProps } from '@chakra-ui/layout';
import React from 'react';
import styled from 'styled-components';
import { FlipCardFront } from './FlipCardFront';

type FlipCardBackProps = BoxProps;

const StyledBox = styled(FlipCardFront)`
	transform: rotateY(180deg);
`;

export const FlipCardBack: React.FC<FlipCardBackProps> = (props) => {
	return <StyledBox {...props}>{props.children}</StyledBox>;
};
