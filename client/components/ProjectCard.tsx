import { Box } from '@chakra-ui/react';
import NextImg from 'next/image';
import React, { forwardRef } from 'react';
import { FlipCard, FlipCardProps } from './FlipCard';
import styled from 'styled-components';
import { Tag } from '../types/Tag';

export interface ProjectCardProps extends FlipCardProps {
	tags?: Tag[];
	title?: string;
	subtitle?: string;
	iconSize?: number;
	innerStyle?: React.CSSProperties;
}

const TagContainer = styled(Box)`
	position: absolute;
	display: inline-block;
	bottom: 0;
	backface-visibility: hidden;
	transform-style: preserve-3d;
	margin: 10px;

	& > div {
		vertical-align: middle;
	}
`;

const StyledFlipCard = styled(FlipCard)`
	&.reorder {
		transition: transform 0.5s;
	}
` as typeof FlipCard;

export const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
	({ children, tags, iconSize = 30, innerStyle, ...props }, ref) => {
		let className = '';

		tags?.forEach((tag, count) => {
			if (count < tags.length - 1) {
				className += tag + ' ';
			} else {
				className += tag;
			}
		});

		className += ' projectCard';

		return (
			<StyledFlipCard
				innerStyle={innerStyle}
				className={className}
				ref={ref}
				{...props}
			>
				{children}
				<TagContainer>
					{tags?.map((tag, key) => (
						<NextImg
							src={'/images/' + tag + '.png'}
							width={iconSize}
							height={iconSize}
							key={key}
						/>
					))}
				</TagContainer>
			</StyledFlipCard>
		);
	}
);
ProjectCard.displayName = 'ProjectCard';
