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
import React, { useContext, useEffect, useState } from 'react';
import { InputField } from '../components/InputField';
import { Layout } from '../components/Layout';
import { Engine } from '../scripts/bouncejs/Engine';
import { initContactPageBall } from '../scripts/initContactPageBall.js';
import { ThemeContext } from '../themes/theme';
import Head from 'next/head';

const Contact = () => {
	const [screenSize, getDimension] = useState({
		width: 0,
		height: 0,
	});

	const setDimension = () => {
		getDimension({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	};

	let engine: Engine;

	// First render
	useEffect(() => {
		setDimension();
		requestAnimationFrame(() => {
			engine = initContactPageBall();
		});

		return () => {
			engine?.stop();
		};
	}, []);

	// On screensize change
	useEffect(() => {
		window.addEventListener('resize', setDimension);

		return () => {
			window.removeEventListener('resize', setDimension);
		};
	}, [screenSize]);

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
		<>
			<Head>
				<title>Contact Me</title>
			</Head>
			<Layout>
				<canvas
					width={0}
					height={0}
					style={{ position: 'fixed', zIndex: -1, top: 0 }}
				></canvas>
				<Heading
					color="gray.500"
					fontSize={['3xl', null, '4xl', null, '5xl']}
					textAlign="center"
				>
					<EmailIcon color="gray.500" /> me@benbowers.net
				</Heading>
				<Flex
					flexDir="column"
					justify="center"
					w={screenSize.height < screenSize.width ? '50vh' : '60vw'}
					h={screenSize.height < screenSize.width ? '50vh' : '60vw'}
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
										textAlign: 'center',
									}}
									placeholder="johndoe@example.com"
									placeholderColor="rgba(255, 255, 255, 0.6)"
									type="email"
									required
									style={{
										backgroundColor:
											Theme.colors[
												colorTheme as keyof typeof Theme.colors
											][600],
										color: 'white',
									}}
									className="contactInput"
									mb={[2, null, 4, null, 6]}
								/>
								<InputField
									name="message"
									label="Your Message"
									formLabelProps={{
										color: 'white',
										textAlign: 'center',
									}}
									textarea
									placeholder="Write your message here..."
									placeholderColor="rgba(255, 255, 255, 0.6)"
									required
									style={{
										backgroundColor:
											Theme.colors[
												colorTheme as keyof typeof Theme.colors
											][600],
										color: 'white',
									}}
									className="contactInput"
									mb={[2, null, 4, null, 6]}
								/>
								<Box textAlign={'center'}>
									<Button
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
						<AlertDescription>
							Message sent to me@benbowers.net
						</AlertDescription>
						<CloseButton
							position="absolute"
							right="8px"
							top="8px"
							onClick={toggleSuccessAlert}
						/>
					</Alert>
				</Slide>
			</Layout>
		</>
	);
};

export default Contact;
