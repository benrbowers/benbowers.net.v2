import { CloseIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
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
				top={['', '0px', '0px']}
				bottom={['0px', '', '']}
				m={3}
				isActive={active}
				animationDuration={animationDuration}
				className="settingsButton"
				_focus={{
					boxShadow:
						'0px 0px 0px 3px ' +
						Theme.colors[colorTheme as keyof typeof Theme.colors]['400'],
				}}
				onClick={() => {
					setActive(!active);
				}}
			/>
			<SettingsMenu
				zIndex={2}
				pos="fixed"
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
							Theme.colors[colorTheme as keyof typeof Theme.colors]['400'],
					}}
					onClick={() => {
						setActive(false);
					}}
				/>
			</SettingsMenu>
		</>
	);
};
