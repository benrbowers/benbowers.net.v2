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

type InputFieldProps = InputHTMLAttributes<
	HTMLInputElement | HTMLTextAreaElement
> & {
	label: string;
	name: string;
	textarea?: boolean;
	formLabelProps?: Omit<FormLabelProps, 'htmlFor'>;
};

// '' => false
// 'error message stuff' => true

export const InputField: React.FC<InputFieldProps> = ({
	label,
	textarea,
	size: _,
	formLabelProps,
	...props
}) => {
	const [field, { error }] = useField(props);
	return (
		<FormControl isInvalid={!!error}>
			<FormLabel htmlFor={field.name} {...formLabelProps}>
				{label}
			</FormLabel>

			{textarea ? (
				<Textarea {...field} {...props} resize="none" id={field.name} />
			) : (
				<Input {...field} {...props} id={field.name} />
			)}
			{error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
		</FormControl>
	);
};
