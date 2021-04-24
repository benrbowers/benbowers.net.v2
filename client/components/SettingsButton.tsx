import { IconButton, ButtonProps } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';

interface SettingsButtonProps extends ButtonProps {
	animationDuration?: number;
	activeColor?: string;
	isActive?: boolean;
}

export const SettingsButton: React.FC<SettingsButtonProps> = ({
	animationDuration = 0.5,
	isActive = false,
	...props
}) => {
	return (
		<IconButton
			aria-label="Settings"
			variant="unstyled"
			icon={
				<SettingsIcon
					transition={`transform ${animationDuration}s`}
					transform={isActive ? 'rotate(60deg)' : 'rotate(0)'}
					w={7}
					h={7}
					color="gray.500"
				/>
			}
			{...props}
		/>
	);
};
