import { Box, BoxProps } from '@chakra-ui/react';
import React, { MouseEvent, TouchEvent } from 'react';
import styles from './FlipCard.module.css';
import { keyframes } from 'styled-components';

export interface FlipCardProps extends BoxProps {
	flipDuration?: number; // Duration of flip in seconds
	doesFlipOnHover?: boolean; // Whether or not the note should flip on hover
	doesFlipOnClick?: boolean; // Whether or not the note should flip on click
	doesFlipOnTap?: boolean; // Whether or not the note should flip
}

export const FlipCard: React.FC<FlipCardProps> = ({
	flipDuration = 1,
	doesFlipOnHover = false,
	doesFlipOnClick = false,
	doesFlipOnTap = false,
	children,
	className,
	...props
}) => {
	const flipOnEnter = (e: MouseEvent<HTMLDivElement>) => {
		const flipCardInner = e.currentTarget.children[0] as HTMLDivElement;
		flipCardInner.style.animation =
			styles.flipF2B + ' ' + flipDuration + 's forwards';
	};

	const flipOnLeave = (e: MouseEvent<HTMLDivElement>) => {
		const flipCardInner = e.currentTarget.children[0] as HTMLDivElement;
		flipCardInner.style.animation =
			styles.flipB2F + ' ' + flipDuration + 's forwards';
	};

	const flipOnClick = (e: MouseEvent<HTMLDivElement>) => {
		const flipCardInner = e.currentTarget.children[0] as HTMLDivElement;

		if (flipCardInner.style.animation.includes(styles.flipF2B)) {
			flipCardInner.style.animation =
				styles.flipB2F + ' ' + flipDuration + 's forwards';
		} else {
			flipCardInner.style.animation =
				styles.flipF2B + ' ' + flipDuration + 's forwards';
		}
	};

	const flipOnTap = (e: TouchEvent<HTMLDivElement>) => {
		const flipCardInner = e.currentTarget.children[0] as HTMLDivElement;

		if (flipCardInner.style.animation.includes(styles.flipF2B)) {
			flipCardInner.style.animation =
				styles.flipB2F + ' ' + flipDuration + 's forwards';
		} else {
			flipCardInner.style.animation =
				styles.flipF2B + ' ' + flipDuration + 's forwards';
		}
	};

	return (
		<Box
			{...props}
			className={styles.flipCard + ' ' + className}
			onClick={doesFlipOnClick ? flipOnClick : undefined}
			onMouseEnter={doesFlipOnHover ? flipOnEnter : undefined}
			onMouseLeave={doesFlipOnHover ? flipOnLeave : undefined}
			onTouchStart={doesFlipOnTap ? flipOnTap : undefined}
		>
			<Box className={styles.flipCardInner}>{children}</Box>
		</Box>
	);
};
