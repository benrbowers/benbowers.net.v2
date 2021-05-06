import { Button } from '@chakra-ui/react';
import React from 'react';
import { Layout } from '../components/Layout';
import axios from 'axios';

const Contact = () => (
	<Layout>
		<Button
			onClick={() => {
				axios
					.post('/api/hello', { banana: 'banana' })
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
