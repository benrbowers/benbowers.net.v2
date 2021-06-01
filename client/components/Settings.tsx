import React, { useState } from 'react';
import { SettingsButton } from './SettingsButton';
import { SettingsMenu } from './SettingsMenu';

interface SettingsProps {
	animationDuration?: number;
}

export const Settings: React.FC<SettingsProps> = ({
	animationDuration = 1,
}) => {
	const [active, setActive] = useState(false);

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
				onClick={() => {
					setActive(!active);
				}}
			/>
			<SettingsMenu
				zIndex={2}
				pos="fixed"
				transition={`left ${animationDuration}s`}
				left={active ? '0px' : '-305px'}
			/>
		</>
	);
};
