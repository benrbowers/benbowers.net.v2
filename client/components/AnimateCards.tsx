import React, { useEffect, ReactElement } from 'react';
import { Grid, GridProps } from '@chakra-ui/react';
import { Tag } from '../types/Tag';
import { ProjectCardProps } from './ProjectCard';

interface AnimateCardsProps extends GridProps {
	selectedTags: Tag[];
	animationDuration?: number;
	animationEasing?: string;
}

export const AnimateCards: React.FC<AnimateCardsProps> = ({
	children,
	selectedTags,
	animationDuration = 1,
	animationEasing = 'ease',
	...props
}) => {
	useEffect(() => {
		const selectedVisibleCards: HTMLDivElement[] = []; // Array to store selected cards that are already visible
		const selectedHiddenCards: HTMLDivElement[] = []; // Array to store selcted cards that are currently hidden (unselected)
		const unselectedCards: HTMLDivElement[] = []; // Array to store unselected cards

		React.Children.forEach(children, (child) => {
			if (React.isValidElement(child)) {
				const projCard = child as ReactElement<ProjectCardProps> & {
					ref: React.MutableRefObject<HTMLDivElement>;
				};

				let selected = false;
				if (selectedTags.length) {
					for (let i = 0; i < selectedTags.length; i++) {
						if (projCard.props.tags?.includes(selectedTags[i])) {
							selected = true;
						} else {
							selected = false;
							break;
						}
					}
				} else {
					selected = true;
				}

				if (projCard.ref) {
					if (selected) {
						console.log(getComputedStyle(projCard.ref.current).display);
						if (getComputedStyle(projCard.ref.current).display === 'block') {
							selectedVisibleCards.push(projCard.ref.current);
							console.log('visible');
						} else {
							selectedHiddenCards.push(projCard.ref.current);
							console.log('hidden');
						}
					} else {
						unselectedCards.push(projCard.ref.current);
					}
				} else {
					console.error(child, ' has no ref.');
				}
			} else {
				// eslint-disable-next-line prettier/prettier
				console.error(child, ' is not a valid child for AnimateCards');
			}
		}); // End forEach

		// Get boundingRects before reposition
		const oldRects: DOMRect[] = [];
		selectedVisibleCards.forEach((card) => {
			oldRects.push(card.getBoundingClientRect());
		});

		// Hide unselected cards
		unselectedCards.forEach((card) => {
			card.style.display = 'none';
		});

		// Fade in hidden selected cards
		selectedHiddenCards.forEach((card) => {
			card.style.display = 'inline-block';

			const cardInner = card.children[0] as HTMLDivElement; // Part of the card that flips
			cardInner.style.animationName = 'none'; // Prevent card from flipping

			card.animate([{ opacity: 0.0 }, { opacity: 1.0 }], {
				duration: animationDuration * 1000 * 2,
				easing: animationEasing,
			});

			// Reset animationName to allow flipping again
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
		});

		// Get boundingRects after reposition
		const newRects: DOMRect[] = [];
		selectedVisibleCards.forEach((card) => {
			newRects.push(card.getBoundingClientRect());
		});

		// Slide visible selected cards to their new positions
		selectedVisibleCards.forEach((card, i) => {
			const changeInX = oldRects[i].left - newRects[i].left + 'px'; // Change in horizontal pixels (inverted)
			const changeInY = oldRects[i].top - newRects[i].top + 'px'; // Change in vertical pixels (inverted)
			console.log(changeInX);

			// Animate from old position to position
			if (changeInX || changeInY) {
				card.animate(
					[
						{ transform: `translate(${changeInX}, ${changeInY})` },
						{ transform: 'translate(0)' },
					],
					{
						duration: animationDuration * 1000,
						easing: animationEasing,
					}
				);
			}
		});
	}); // End useEffect

	return <Grid {...props}>{children}</Grid>;
};
