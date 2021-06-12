import { Box, Button } from '@chakra-ui/react';
import Theme from '@chakra-ui/theme';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { InputField } from '../components/InputField';
import { Layout } from '../components/Layout';
import { Engine } from '../scripts/bouncejs/Engine';
import { initContactPageBall } from '../scripts/initContactPageBall.js';
import { ThemeContext } from '../themes/theme';

const Contact = () => {
	let hasLoaded = false; // Whether the page has loaded
	let engine = null as null | Engine; // The ball engine

	const router = useRouter();

	useEffect(() => {
		if (!hasLoaded) {
			// Start bouncy balls only if the page has not loaded before
			engine = initContactPageBall();
			hasLoaded = true;
		}

		if (engine) {
			router.events.on('routeChangeStart', (url: string) => {
				if (url !== '/') {
					// Stop engine if page is changed
					engine?.stop();
				}
			});
		}
	});

	const { colorTheme } = useContext(ThemeContext);

	return (
		<Layout>
			<canvas
				width={0}
				height={0}
				style={{ position: 'fixed', zIndex: -1, top: 0 }}
			></canvas>
			<Box
				w={['250px', '350px', '400px', '450px', '500px']}
				h={['250px', '350px', '400px', '450px', '500px']}
				className="contactForm"
				pos="fixed"
				top={0}
			>
				<Formik
					initialValues={{ email: '', message: '' }}
					onSubmit={(values, actions) => {
						actions.setSubmitting(true);
						axios
							.post('/api/mail', {
								email: values.email,
								message: values.message,
							})
							.then((response) => {
								console.log(response);
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
								formLabelProps={{ color: 'white' }}
								placeholder="johndoe@example.com"
								type="email"
								required
								style={{
									backgroundColor:
										Theme.colors[colorTheme as keyof typeof Theme.colors][500],
									color: 'white',
								}}
							/>
							<br />
							<InputField
								name="message"
								label="Your Message"
								formLabelProps={{ color: 'white' }}
								textarea
								placeholder="Write your message here..."
								required
								style={{
									backgroundColor:
										Theme.colors[colorTheme as keyof typeof Theme.colors][500],
									color: 'white',
								}}
							/>
							<Button
								mt={4}
								colorScheme={colorTheme}
								isLoading={props.isSubmitting}
								type="submit"
							>
								Submit
							</Button>
						</Form>
					)}
				</Formik>
			</Box>
		</Layout>
	);
};

export default Contact;
