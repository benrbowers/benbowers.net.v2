import {
	Box,
	BoxProps,
	Checkbox,
	CheckboxProps,
	Heading,
	Stack,
} from '@chakra-ui/react';
import React from 'react';

type SettingsMenuProps = BoxProps;

export const SettingsMenu: React.FC<SettingsMenuProps> = (props) => {
	const checkboxProps: CheckboxProps = {
		color: 'gray.500',
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
			<Heading textAlign="center" color="gray.500">
				Settings
			</Heading>
			<hr />
			<br />
			<Stack>
				<Checkbox {...checkboxProps}>GitHub</Checkbox>
			</Stack>
		</Box>
	);
};
