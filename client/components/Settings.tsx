import { CloseIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import Theme from '@chakra-ui/theme';
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../themes/theme';
import { SettingsButton } from './SettingsButton';
import { SettingsMenu } from './SettingsMenu';

interface SettingsProps {
	animationDuration?: number;
}

export const Settings: React.FC<SettingsProps> = ({
	animationDuration = 1,
}) => {
	const [active, setActive] = useState(false);
	const { colorTheme } = useContext(ThemeContext);

	return (
		<>
			<SettingsButton
				zIndex={3}
				pos="fixed"
				top={['', '0px']}
				bottom={['0px', '']}
				m={3}
				isActive={active}
				animationDuration={animationDuration}
				className="settingsButton"
				_focus={{
					boxShadow:
						'0px 0px 0px 3px ' +
						Theme.colors[colorTheme as keyof typeof Theme.colors]['300'],
				}}
				onClick={() => {
					setActive(!active);
				}}
			/>
			<Flex w="full" h="full" flexDir="row" pos="fixed" top={0} zIndex={2}>
				<SettingsMenu
					pos="relative"
					transition={`left ${animationDuration}s`}
					left={active ? '0px' : '-305px'}
				>
					<IconButton
						visibility={['visible', 'hidden']}
						w={8}
						h={8}
						m={3}
						zIndex={3}
						pos="absolute"
						top="0px"
						right="0px"
						aria-label="close settings"
						className="closeSettings"
						icon={<CloseIcon />}
						color="gray.500"
						bgColor="white"
						_focus={{
							boxShadow:
								'0px 0px 0px 3px ' +
								Theme.colors[colorTheme as keyof typeof Theme.colors]['300'],
						}}
						onClick={() => {
							setActive(false);
						}}
					/>
				</SettingsMenu>
				<Box
					h="full"
					flexGrow={1}
					pointerEvents={active ? 'auto' : 'none'}
					onClick={() => {
						setActive(false);
					}}
				/>
			</Flex>
		</>
	);
};
