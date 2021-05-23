import {
	Button,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Input,
	Textarea,
} from '@chakra-ui/react';
import React from 'react';
import { Layout } from '../components/Layout';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { InputField } from '../components/InputField';

const Contact = () => (
	<Layout>
		<Formik
			initialValues={{ email: '', message: '' }}
			onSubmit={(values, actions) => {
				actions.setSubmitting(true);
				axios
					.post('/api/mail', { email: values.email, message: values.message })
					.then((response) => {
						console.log(response.data.message);
						actions.setSubmitting(false);
					})
					.catch((error) => {
						console.log(error);
						actions.setSubmitting(false);
					});
			}}
		>
			{(props) => (
				<Form>
					<InputField
						name="email"
						label="Your Email"
						placeholder="johndoe@example.com"
					/>
					<InputField
						name="message"
						label="Your Message"
						textarea
						placeholder="Write your message here..."
					/>
					<Button
						mt={4}
						colorScheme="teal"
						isLoading={props.isSubmitting}
						type="submit"
					>
						Submit
					</Button>
				</Form>
			)}
		</Formik>
		<Button
			onClick={() => {
				axios
					.post('/api/mail', { banana: 'banana' })
					.then((response) => {
						console.log(response);
					})
					.catch((error) => {
						console.log(error);
					});
			}}
		>
			Hello
		</Button>
	</Layout>
);

export default Contact;
