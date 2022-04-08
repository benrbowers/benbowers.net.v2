import { Center, Flex, Link, Text, TextProps } from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';
import React, { useContext, useRef, useState } from 'react';
import { AnimateCards } from '../components/AnimateCards';
import { FlipCardBack } from '../components/FlipCardBack';
import { FlipCardFront } from '../components/FlipCardFront';
import { Layout } from '../components/Layout';
import { ProjectCard, ProjectCardProps } from '../components/ProjectCard';
import { TagButton, TagButtonProps } from '../components/TagButton';
import { Tag } from '../types/Tag';
import { ThemeContext } from '../themes/theme';
import Head from 'next/head';

const projectProps: Omit<ProjectCardProps, 'ref'> = {
	w: '250px',
	h: '250px',
	borderRadius: '25px',
	bgColor: 'white',
	doesFlipOnHover: true,
	doesFlipOnTap: true,
	iconSize: 40,
	innerStyle: {
		boxShadow: '0px 0px 7px 2px darkgray',
	},
};

const projTitleProps: TextProps = {
	color: 'gray.500',
	fontSize: 'xx-large',
	textAlign: 'center',
};

const Projects = () => {
	const [selectedTags, setSelectedTags] = useState([] as Tag[]);
	const { colorTheme } = useContext(ThemeContext);

	const addSelectedTag = (tag: Tag, add: boolean) => {
		if (add) {
			setSelectedTags([...selectedTags, tag]);
		} else {
			setSelectedTags(selectedTags.filter((currentTag) => tag !== currentTag));
		}
	};

	const tagButtonProps: Omit<TagButtonProps, 'tag'> = {
		iconSize: 40,
		fontSize: 'lg',
		mx: '10px',
		mt: '20px',
		selectTagCallback: addSelectedTag,
	};

	return (
		<>
			<Head>
				<title>My Projects</title>
			</Head>
			<Layout>
				<Flex
					justifyContent="center"
					alignContent="space-between"
					flexWrap="wrap"
				>
					<TagButton tag="HTML" {...tagButtonProps} />
					<TagButton tag="CSS" {...tagButtonProps} />
					<TagButton tag="JavaScript" {...tagButtonProps} />
					<TagButton tag="TypeScript" {...tagButtonProps} />
					<TagButton tag="React" {...tagButtonProps} />
					<TagButton tag="NextJS" {...tagButtonProps} />
					<TagButton tag="GDScript" {...tagButtonProps} />
					<TagButton tag="Cpp" {...tagButtonProps} />
					<TagButton tag="php" {...tagButtonProps} />
				</Flex>
				<AnimateCards
					selectedTags={selectedTags}
					animationDuration={0.7}
					gridTemplateColumns="repeat(auto-fit, 250px)"
					justifyContent="center"
					gridGap="40px"
					mt="40px"
				>
					<ProjectCard
						tags={['JavaScript']}
						ref={useRef(null)}
						{...projectProps}
					>
						<FlipCardFront
						// bgImg={'url("/static/physicsFun.svg")'}
						// bgRepeat="no-repeat"
						// bgSize="80%"
						// bgPos="center"
						>
							<Center h="100%" borderRadius="inherit" bgColor="whiteAlpha.500">
								<Text {...projTitleProps}>BounceJS</Text>
							</Center>
						</FlipCardFront>
						<FlipCardBack>
							<Center h="100%">
								<Text m="10px" color="gray.600">
									BounceJS is a small physics library made with vanilla
									JavaScript that animates circles on an HTML canvas. You saw it
									in action on the home page. <br /> <br />
									<Link
										color={colorTheme + '.400'}
										href="https://codesandbox.io/s/bouncejs-demo-vgikr"
									>
										Here's a fun demo{' '}
										<ArrowRightIcon w={3} h={3} color={colorTheme + '.400'} />
									</Link>
									<br />
									<Link
										color={colorTheme + '.400'}
										href="https://codesandbox.io/s/physics-fun-rqkgc"
									>
										Here's another!{' '}
										<ArrowRightIcon w={3} h={3} color={colorTheme + '.400'} />
									</Link>
								</Text>
							</Center>
						</FlipCardBack>
					</ProjectCard>

					<ProjectCard
						tags={['JavaScript', 'HTML', 'CSS']}
						ref={useRef(null)}
						{...projectProps}
					>
						<FlipCardFront>
							<Center h="100%">
								<Text {...projTitleProps}>Sticky Notes</Text>
							</Center>
						</FlipCardFront>
						<FlipCardBack>
							<Center h="100%">
								<Text m="10px" color="gray.600">
									Sticky Notes is a note taking app made with vanilla
									JavaScript, HTML, and CSS.
									<br /> <br />
									<Link
										color={colorTheme + '.400'}
										href="https://codesandbox.io/s/sticky-notes-gbrrw"
									>
										Stick some notes{' '}
										<ArrowRightIcon w={3} h={3} color={colorTheme + '.400'} />
									</Link>
								</Text>
							</Center>
						</FlipCardBack>
					</ProjectCard>

					<ProjectCard
						tags={['HTML', 'CSS', 'JavaScript', 'php']}
						ref={useRef(null)}
						{...projectProps}
					>
						<FlipCardFront>
							<Center h="100%">
								<Text {...projTitleProps}>Chore Board</Text>
							</Center>
						</FlipCardFront>
						<FlipCardBack>
							<Center h="100%" w="100%">
								<Text m="10px" color="gray.600">
									This is a chore board I built for my roommates and I. It was
									built with HTML, CSS, JS, and php. It is hosted on a raspberry
									pi using Apache so all people connected to the WiFi can access
									it.
									<br /> <br />
									<Link
										color={colorTheme + '.400'}
										href="https://github.com/benrbowers/chore-board"
									>
										Check it out here{' '}
										<ArrowRightIcon w={3} h={3} color={colorTheme + '.400'} />
									</Link>
								</Text>
							</Center>
						</FlipCardBack>
					</ProjectCard>

					<ProjectCard
						tags={['TypeScript', 'NextJS', 'React']}
						ref={useRef(null)}
						{...projectProps}
					>
						<FlipCardFront>
							<Center h="100%">
								<Text {...projTitleProps}>This Site</Text>
							</Center>
						</FlipCardFront>
						<FlipCardBack>
							<Center h="100%">
								<Text m="10px" color="gray.600">
									The website you're viewing right now was made with TypeScript,
									NextJS, and ReactJS
									<br /> <br />
									<Link
										color={colorTheme + '.400'}
										href="https://github.com/benrbowers/benbowers.net.v2"
									>
										Here's the code{' '}
										<ArrowRightIcon w={3} h={3} color={colorTheme + '.300'} />
									</Link>
								</Text>
							</Center>
						</FlipCardBack>
					</ProjectCard>

					<ProjectCard
						tags={['GDScript', 'Cpp']}
						ref={useRef(null)}
						{...projectProps}
					>
						<FlipCardFront>
							<Center h="100%">
								<Text {...projTitleProps}>Cube Fractal Generator</Text>
							</Center>
						</FlipCardFront>
						<FlipCardBack>
							<Center h="100%" w="100%">
								<Text m="10px" color="gray.600">
									This was built with GDScript (similar to Python) and C++ in
									the Godot game engine. It recursively generates cube fractals
									using different Minecraft textures.
									<br /> <br />
									<Link
										color={colorTheme + '.400'}
										href="./FractalGeneratorDemo/index.html"
									>
										Try it out{' '}
										<ArrowRightIcon w={3} h={3} color={colorTheme + '.400'} />
									</Link>
									<br />
									<Link
										color={colorTheme + '.400'}
										href="https://github.com/benrbowers/cube-fractal-generator"
									>
										See the code{' '}
										<ArrowRightIcon w={3} h={3} color={colorTheme + '.400'} />
									</Link>
								</Text>
							</Center>
						</FlipCardBack>
					</ProjectCard>
				</AnimateCards>
			</Layout>
		</>
	);
};

export default Projects;
