import { Box, Button, ButtonProps, Text } from '@chakra-ui/react';
import Theme from '@chakra-ui/theme';
import Image from 'next/image';
import React, { useState, useContext } from 'react';
import { Tag } from '../types/Tag';
import styled from 'styled-components';
import { ThemeContext } from '../themes/theme';

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
		bottom: 0.4em;
	}
` as typeof Button;

const TagText = styled(Text)`
	display: inline-block;
	color: white;
	vertical-align: middle;
` as typeof Text;

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

	const { colorTheme } = useContext(ThemeContext);

	const chakraColors = Theme.colors;

	return (
		<StyledButton
			borderRadius={iconSize / 2 + 'px'}
			bgColor={selected ? 'gray.600' : 'gray.400'}
			_hover={{ opacity: 1 }}
			_focus={{
				boxShadow:
					'0px 0px 0px 3px ' +
					chakraColors[colorTheme as keyof typeof chakraColors]['300'],
			}}
			onClick={() => {
				selectTagCallback(tag, !selected);
				setSelected(!selected);
			}}
			outlineColor={colorTheme + '.400'}
			{...props}
		>
			<ImageContainer>
				<Image
					src={'/images/' + tag + '.png'}
					width={iconSize}
					height={iconSize}
				/>
			</ImageContainer>
			<TagText ml={1} fontSize={fontSize}>
				{tag === 'Cpp' ? 'C++' : tag}
			</TagText>
		</StyledButton>
	);
};
