import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	CloseButton,
	Flex,
	Heading,
	Slide,
	useDisclosure,
} from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';
import Theme from '@chakra-ui/theme';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { InputField } from '../components/InputField';
import { Layout } from '../components/Layout';
import { Engine } from '../scripts/bouncejs/Engine';
import { initContactPageBall } from '../scripts/initContactPageBall.js';
import { ThemeContext } from '../themes/theme';

const Contact = () => {
	const [hasLoaded, setHasLoaded] = useState(false);
	let engine = null as null | Engine; // The ball engine

	const router = useRouter();

	useEffect(() => {
		if (!hasLoaded) {
			// Start bouncy balls only if the page has not loaded before
			engine = initContactPageBall();
			setHasLoaded(true);
		}

		if (engine) {
			router.events.on('routeChangeStart', (url: string) => {
				if (url !== '/contact') {
					// Stop engine if page is changed
					engine?.stop();
				}
			});
		}
	});

	const { colorTheme } = useContext(ThemeContext);

	const {
		isOpen: errorAlertOpen,
		onToggle: toggleErrorAlert,
	} = useDisclosure();
	const {
		isOpen: successAlertOpen,
		onToggle: toggleSuccessAlert,
	} = useDisclosure();
	const [errorMessage, setErrorMessage] = useState('');

	return (
		<Layout>
			<canvas
				width={0}
				height={0}
				style={{ position: 'fixed', zIndex: -1, top: 0 }}
			></canvas>
			<Heading
				color="gray.500"
				fontSize={['35px', '45px', '65px', '80px', '100px']}
				textAlign="center"
			>
				<EmailIcon color="gray.500" /> me@benbowers.net
			</Heading>
			<Flex
				flexDir="column"
				justify="center"
				w={['250px', '325px', '400px', '450px', '500px']}
				h={['250px', '325px', '400px', '450px', '500px']}
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
								toggleSuccessAlert();
							})
							.catch((error) => {
								console.log(error);
								actions.setSubmitting(false);
								setErrorMessage(error.message);
								toggleErrorAlert();
							});
					}}
				>
					{(props) => (
						<Form>
							<InputField
								name="email"
								label="Your Email"
								formLabelProps={{
									color: 'white',
									textAlign: ['center', 'center', 'left'],
								}}
								placeholder="johndoe@example.com"
								placeholderColor="rgba(255, 255, 255, 0.6)"
								type="email"
								required
								style={{
									backgroundColor:
										Theme.colors[colorTheme as keyof typeof Theme.colors][600],
									color: 'white',
								}}
								className="contactInput"
							/>
							<br />
							<InputField
								name="message"
								label="Your Message"
								formLabelProps={{
									color: 'white',
									textAlign: ['center', 'center', 'left'],
								}}
								textarea
								placeholder="Write your message here..."
								placeholderColor="rgba(255, 255, 255, 0.6)"
								required
								style={{
									backgroundColor:
										Theme.colors[colorTheme as keyof typeof Theme.colors][600],
									color: 'white',
								}}
								className="contactInput"
							/>
							<Box textAlign={['center', 'center', 'left']}>
								<Button
									mt={4}
									bgColor={
										Theme.colors[colorTheme as keyof typeof Theme.colors][600]
									}
									color="white"
									isLoading={props.isSubmitting}
									type="submit"
									className="contactSubmit"
								>
									Send
								</Button>
							</Box>
						</Form>
					)}
				</Formik>
			</Flex>
			<Slide direction="bottom" in={errorAlertOpen} style={{ zIndex: 10 }}>
				<Alert status="error">
					<AlertIcon />
					<AlertTitle mr={2}>Message not sent!</AlertTitle>
					<AlertDescription>{errorMessage}</AlertDescription>
					<CloseButton
						position="absolute"
						right="8px"
						top="8px"
						onClick={toggleErrorAlert}
					/>
				</Alert>
			</Slide>

			<Slide direction="bottom" in={successAlertOpen} style={{ zIndex: 10 }}>
				<Alert status="success">
					<AlertIcon />
					<AlertTitle mr={2}>Success!</AlertTitle>
					<AlertDescription>Message sent to me@benbowers.net</AlertDescription>
					<CloseButton
						position="absolute"
						right="8px"
						top="8px"
						onClick={toggleSuccessAlert}
					/>
				</Alert>
			</Slide>
		</Layout>
	);
};

export default Contact;
