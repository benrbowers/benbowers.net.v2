import { Box, BoxProps } from '@chakra-ui/react';
import React, { useState, forwardRef } from 'react';
import styled from 'styled-components';
import { FlipCardInner } from './FlipCardInner';

export interface FlipCardProps extends BoxProps {
	flipDuration?: number; // Duration of flip in seconds
	doesFlipOnHover?: boolean; // Whether or not the note should flip on hover
	doesFlipOnClick?: boolean; // Whether or not the note should flip on click
	doesFlipOnTap?: boolean; // Whether or not the note should flip
	innerStyle?: React.CSSProperties;
}

// The outer most flip card container. Has perspective
// so its children appear to "pop out"
const FlipCardOuter = styled(Box)`
	position: relative;
	perspective: 600px;
` as typeof Box;

export const FlipCard = forwardRef<HTMLDivElement, FlipCardProps>(
	(
		{
			flipDuration = 1,
			doesFlipOnHover = false,
			doesFlipOnClick = false,
			doesFlipOnTap = false,
			innerStyle,
			children,
			...props
		},
		ref
	) => {
		const [flipped, setFlipped] = useState(undefined as boolean | undefined);

		const flipOnEnter = () => {
			setFlipped(true);
		};

		const flipOnLeave = () => {
			setFlipped(false);
		};

		const flipOnClick = () => {
			setFlipped(!flipped);
		};

		const flipOnTap = () => {
			setFlipped(!flipped);
		};

		return (
			<FlipCardOuter
				{...props}
				onClick={doesFlipOnClick ? flipOnClick : undefined}
				onMouseEnter={doesFlipOnHover ? flipOnEnter : undefined}
				onMouseLeave={doesFlipOnHover ? flipOnLeave : undefined}
				onTouchStart={doesFlipOnTap ? flipOnTap : undefined}
				ref={ref}
			>
				<FlipCardInner
					innerStyle={innerStyle}
					flipDuration={flipDuration}
					flipped={flipped}
				>
					{children}
				</FlipCardInner>
			</FlipCardOuter>
		);
	}
);
FlipCard.displayName = 'FlipCard';
