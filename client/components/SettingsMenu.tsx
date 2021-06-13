import { ChevronDownIcon } from '@chakra-ui/icons';
import {
	Box,
	BoxProps,
	Button,
	Heading,
	Input,
	Menu,
	MenuButton,
	MenuItem,
	MenuItemOption,
	MenuList,
	MenuOptionGroup,
} from '@chakra-ui/react';
import React, { MouseEvent, useContext } from 'react';
import { useCookies } from 'react-cookie';
import Theme from '@chakra-ui/theme';
import { ThemeContext } from '../themes/theme';

type SettingsMenuProps = BoxProps;

export const SettingsMenu: React.FC<SettingsMenuProps> = ({
	children,
	...props
}) => {
	const { colorTheme, changeColor } = useContext(ThemeContext);
	const [cookies] = useCookies(['colorTheme']);

	const setTheme = (e: MouseEvent<HTMLButtonElement>) => {
		changeColor(e.currentTarget.value);
	};

	return (
		<Box
			h="100%"
			width="300px"
			boxShadow={['3px 0px 3px 0px darkgray', '5px 0px 5px 0px darkgray']}
			bgColor="white"
			pt="50px"
			px="20px"
			{...props}
		>
			<Heading textAlign="center" color={colorTheme + '.400'}>
				Settings
			</Heading>
			<hr />
			<br />
			<Box textAlign="center">
				<Menu closeOnSelect={false}>
					<MenuButton
						as={Button}
						color="white"
						bgColor="gray.400"
						_hover={{ bgColor: 'gray.500' }}
						_active={{ bgColor: 'gray.600' }}
						_focus={{
							boxShadow:
								'0px 0px 0px 3px ' +
								Theme.colors[colorTheme as keyof typeof Theme.colors]['400'],
						}}
						rightIcon={<ChevronDownIcon />}
					>
						Color Scheme
					</MenuButton>
					<MenuList>
						{cookies.colorTheme ? (
							<MenuOptionGroup type="radio" defaultValue={cookies.colorTheme}>
								<MenuItemOption
									onClick={setTheme}
									className="colorOption"
									color="red.400"
									value="red"
								>
									Red
								</MenuItemOption>
								<MenuItemOption
									onClick={setTheme}
									className="colorOption"
									color="green.400"
									value="green"
								>
									Green
								</MenuItemOption>
								<MenuItemOption
									onClick={setTheme}
									className="colorOption"
									color="cyan.400"
									value="cyan"
								>
									Cyan
								</MenuItemOption>
								<MenuItemOption
									onClick={setTheme}
									className="colorOption"
									color="blue.400"
									value="blue"
								>
									Blue
								</MenuItemOption>
								<MenuItemOption
									onClick={setTheme}
									className="colorOption"
									color="purple.400"
									value="purple"
								>
									Purple
								</MenuItemOption>
								<MenuItemOption
									onClick={setTheme}
									className="colorOption"
									color="pink.400"
									value="pink"
								>
									Pink
								</MenuItemOption>
								<MenuItemOption
									onClick={setTheme}
									className="colorOption"
									color="messenger.400"
									value="messenger"
								>
									Messanger
								</MenuItemOption>
								<MenuItemOption
									onClick={setTheme}
									className="colorOption"
									color="whatsapp.400"
									value="whatsapp"
								>
									Whatsapp
								</MenuItemOption>
							</MenuOptionGroup>
						) : (
							<MenuItem>Loading Color Theme...</MenuItem>
						)}
					</MenuList>
				</Menu>
			</Box>
			{children}
		</Box>
	);
};
