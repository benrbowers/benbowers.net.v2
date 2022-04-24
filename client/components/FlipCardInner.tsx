import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';
import styled, { keyframes } from 'styled-components';

interface FlipCardInnerProps extends BoxProps {
	flipped?: boolean;
	flipDuration: number;
	innerStyle?: React.CSSProperties;
}

const UnstyledFlipCardInner: React.FC<FlipCardInnerProps> = ({
	children,
	flipped,
	flipDuration,
	innerStyle,
	...props
}) => {
	return (
		<Box style={innerStyle} {...props}>
			{children}
		</Box>
	);
};

// Animation to flip from front to back
const flipF2B = keyframes`
	0% {
        transform: rotateY(0deg) translateZ(0px);
		box-shadow: 1px 1px 5px 1px darkgray;
    }
    10% {
        transform: rotateY(0deg) translateZ(25px);
		box-shadow: 1px 1px 20px 1px darkgray;
    }
    90% {
        transform: rotateY(180deg) translateZ(-10px);
		box-shadow: -1px 1px 10px 1px darkgray;
    }
    100% {
        transform: rotateY(180deg) translateZ(0px);
		box-shadow: -1px 1px 5px 1px darkgray;
    }
`;

// Animation to flip from back to front
const flipB2F = keyframes`
	0% {
      transform: rotateY(180deg) translateZ(0px);
	  box-shadow: -1px 1px 5px 1px darkgray;
    }
    10% {
      transform: rotateY(180deg) translateZ(-25px);
	  box-shadow: -1px 1px 20px 1px darkgray;
    }
    90% {
      transform: rotateY(360deg) translateZ(10px);
	  box-shadow: 1px 1px 10px 1px darkgray;
    }
    100% {
      transform: rotateY(360deg) translateZ(0px);
	  box-shadow: 1px 1px 5px 1px darkgray;
    }
`;

// Function to return animation based on _flipped prop
function pickAnimation(flipped: boolean | undefined) {
	if (flipped === true) {
		// flip front to back
		return flipF2B;
	} else if (flipped === false) {
		// flip back to front
		return flipB2F;
	} else {
		// _flipped prop hasn't been set, so use no animation
		// This prevents flip when the component first loads
		return '';
	}
}

// The inner flip card container. This is the part that actually "flips"
export const FlipCardInner = styled(UnstyledFlipCardInner)<FlipCardInnerProps>`
	width: 100%;
	height: 100%;
	transform-style: preserve-3d;
	border-radius: inherit;
	animation-name: ${(props) => pickAnimation(props.flipped)};
	animation-duration: ${(props) => props.flipDuration + 's'};
	animation-fill-mode: forwards;
`;
