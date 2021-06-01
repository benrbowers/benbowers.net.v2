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
import React, { MouseEvent, useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { ThemeContext } from '../themes/theme';

type SettingsMenuProps = BoxProps;

export const SettingsMenu: React.FC<SettingsMenuProps> = (props) => {
	const { colorTheme, changeColor } = useContext(ThemeContext);
	const [cookies] = useCookies(['colorTheme']);
	const [menuDefValue, setMenuDefValue] = useState(
		undefined as undefined | string
	);

	useEffect(() => {
		if (cookies.colorTheme) {
			setMenuDefValue(cookies.colorTheme);
		}
	}, [cookies]);

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
			<Heading textAlign="center" color="gray.500">
				Settings
			</Heading>
			<hr />
			<br />
			<Box textAlign="center">
				<Menu closeOnSelect={false}>
					<MenuButton
						as={Button}
						bgColor={colorTheme + '.400'}
						color="white"
						rightIcon={<ChevronDownIcon />}
						_hover={{ bgColor: colorTheme + '.500' }}
						_active={{ bgColor: colorTheme + '.500' }}
					>
						Color Scheme
					</MenuButton>
					<MenuList>
						{menuDefValue ? (
							<MenuOptionGroup type="radio" defaultValue={menuDefValue}>
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
			<Input placeholder="smBallPcnt" className="smBallPcnt" />
			<Input placeholder="lgBallPcnt" className="lgBallPcnt" />
		</Box>
	);
};
