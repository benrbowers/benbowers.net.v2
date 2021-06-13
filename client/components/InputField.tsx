import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Textarea,
	FormLabelProps,
} from '@chakra-ui/react';
import styled from 'styled-components';

type InputFieldProps = InputHTMLAttributes<
	HTMLInputElement | HTMLTextAreaElement
> & {
	label: string;
	name: string;
	placeholderColor?: string;
	textarea?: boolean;
	formLabelProps?: Omit<FormLabelProps, 'htmlFor'>;
};

// '' => false
// 'error message stuff' => true

const StyledTextarea = styled(Textarea)<InputFieldProps>`
	&::placeholder {
		color: ${(props) =>
			props.$placeholderColor ? props.$placeholderColor : 'gray'};
		opacity: 1;
	}
`;

const StyledInput = styled(Input)<InputFieldProps>`
	&::placeholder {
		color: ${(props) =>
			props.$placeholderColor ? props.$placeholderColor : 'gray'};
		opacity: 1;
	}
`;

export const InputField: React.FC<InputFieldProps> = ({
	label,
	textarea,
	size: _,
	formLabelProps,
	placeholderColor,
	...props
}) => {
	const [field, { error }] = useField(props);
	return (
		<FormControl isInvalid={!!error}>
			<FormLabel htmlFor={field.name} {...formLabelProps}>
				{label}
			</FormLabel>

			{textarea ? (
				<StyledTextarea
					border="none"
					{...field}
					{...props}
					$placeholderColor={placeholderColor}
					resize="none"
					id={field.name}
				/>
			) : (
				<StyledInput
					$placeholderColor={placeholderColor}
					border="none"
					{...field}
					{...props}
					id={field.name}
				/>
			)}
			{error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
		</FormControl>
	);
};
