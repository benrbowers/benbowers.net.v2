import {
	Box,
	BoxProps,
	Checkbox,
	CheckboxProps,
	Heading,
	Input,
	Stack,
} from '@chakra-ui/react';
import React from 'react';
import { ThemeContext } from '../themes/theme';

type SettingsMenuProps = BoxProps;

export const SettingsMenu: React.FC<SettingsMenuProps> = (props) => {
	const checkboxProps: CheckboxProps = {
		color: 'gray.600',
	};
	return (
		<Box
			h="100%"
			width="300px"
			boxShadow="5px 0px 5px 0px darkgray"
			bgColor="white"
			pt="50px"
			px="20px"
			{...props}
		>
			<ThemeContext.Consumer>
				{({ colorTheme }) => (
					<Heading textAlign="center" color={colorTheme + '.500'}>
						Settings
					</Heading>
				)}
			</ThemeContext.Consumer>
			<hr />
			<br />
			<Heading fontSize="large" color="gray.600">
				Balls:
			</Heading>
			<Stack className="ballSettings">
				<Checkbox {...checkboxProps}>GitHub</Checkbox>
				<Checkbox {...checkboxProps}>Resume</Checkbox>
				<Checkbox {...checkboxProps}>Projects</Checkbox>
				<Checkbox {...checkboxProps}>LinkedIn</Checkbox>
			</Stack>
			<br />
			<Heading fontSize="large" color="gray.600">
				Color Theme:
			</Heading>
			<ThemeContext.Consumer>
				{({ changeColor }) => (
					<Input
						placeholder="color"
						className="colorThemeInput"
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								changeColor(e.currentTarget.value);
							}
						}}
					/>
				)}
			</ThemeContext.Consumer>
		</Box>
	);
};
