import { Box, Button, ButtonProps, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useState } from 'react';
import { Tag } from '../types/Tag';
import styled from 'styled-components';

export interface TagButtonProps extends ButtonProps {
	tag: Tag;
	iconSize?: number;
	fontSize?: 'sm' | 'md' | 'lg' | 'x-large' | string;
	selectTagCallback: (tag: Tag, add: boolean) => void;
}

const StyledButton = styled(Button)`
	display: inline-block;
	padding-left: 0.5em;
	padding-right: 0.5em;

	&:active {
		position: relative;
		bottom: 0.5em;
	}
` as typeof Button;

const TagText = styled(Text)`
	display: inline-block;
	color: white;
	vertical-align: middle;
`;

const ImageContainer = styled(Box)`
	display: inline-block;

	& > div {
		vertical-align: middle;
	}
`;

export const TagButton: React.FC<TagButtonProps> = ({
	tag,
	iconSize = 30,
	fontSize = 'md',
	selectTagCallback,
	...props
}) => {
	const [selected, setSelected] = useState(false);

	const selectCards = () => {
		const allCards = document.querySelectorAll(
			'.projectCard'
		) as NodeListOf<HTMLDivElement>; // All project cards on the page
		const selectedCards = document.querySelectorAll(
			'.' + tag
		) as NodeListOf<HTMLDivElement>; // Cards that have the selected tag

		// Get the card positions before reorder
		const oldRects: DOMRect[] = [];
		selectedCards.forEach((card) => {
			oldRects.push(card.getBoundingClientRect());
		});

		if (selected) {
			// Show all non-selected cards
			allCards.forEach((card) => {
				if (!card.className.includes(tag)) {
					const cardInner = card.children[0] as HTMLDivElement;
					cardInner.style.animationName = 'none';

					card.style.display = 'inline-block';

					card.animate([{ opacity: 0.0 }, { opacity: 1.0 }], {
						duration: 600,
						easing: 'ease-in',
					});

					const resetAnimMouseEnter = () => {
						cardInner.style.animationName = '';
						card.removeEventListener('mouseenter', resetAnimMouseEnter);
					};
					const resetAnimTap = () => {
						cardInner.style.animationName = '';
						card.removeEventListener('touchstart', resetAnimTap);
					};

					card.addEventListener('mouseenter', resetAnimMouseEnter);
					card.addEventListener('touchstart', resetAnimTap);
				}
			});

			setSelected(false);
		} else {
			// Hide all non-selected cards
			allCards.forEach((card) => {
				if (!card.className.includes(tag)) {
					card.style.display = 'none';
				}
			});

			setSelected(true);
		}

		// Get the card positions after reorder
		const newRects: DOMRect[] = [];
		selectedCards.forEach((card) => {
			newRects.push(card.getBoundingClientRect());
		});

		selectedCards.forEach((card, i) => {
			const deltaX = oldRects[i].left - newRects[i].left + 'px';
			const deltaY = oldRects[i].bottom - newRects[i].bottom + 'px';
			//console.log(deltaX);
			card.animate(
				[
					{ transform: `translate(${deltaX}, ${deltaY})` },
					{ transform: 'translate(0)' },
				],
				{
					duration: 500,
					easing: 'ease-out',
				}
			);
		});
	};

	return (
		<StyledButton
			borderRadius={iconSize / 2 + 'px'}
			bgColor={selected ? 'gray.600' : 'gray.400'}
			_hover={{ opacity: 1 }}
			onClick={() => {
				selectTagCallback(tag, !selected);
				setSelected(!selected);
			}}
			{...props}
		>
			<ImageContainer>
				<Image
					src={'/static/' + tag + '.png'}
					width={iconSize}
					height={iconSize}
				/>
			</ImageContainer>
			<TagText fontSize={fontSize}>{tag === 'Cpp' ? 'C++' : tag}</TagText>
		</StyledButton>
	);
};
