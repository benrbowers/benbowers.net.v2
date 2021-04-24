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
				isActive={active}
				animationDuration={animationDuration}
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
