import { Flex, Link, Text, TextProps } from '@chakra-ui/react';
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
		boxShadow: '1px 1px 7px 1px darkgray',
	},
};

const projTitleProps: TextProps = {
	color: 'gray.500',
	fontSize: 'xx-large',
	textAlign: 'center',
	lineHeight: '8',
	pb: '4',
};

const projSubitleProps: TextProps = {
	color: 'gray.500',
	fontSize: 'large',
	textAlign: 'center',
	lineHeight: '5',
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
					<TagButton tag="PHP" {...tagButtonProps} />
				</Flex>
				<AnimateCards
					selectedTags={selectedTags}
					animationDuration={0.7}
					gridTemplateColumns="repeat(auto-fit, 250px)"
					justifyContent="center"
					gridGap="40px"
					my="40px"
				>
					<ProjectCard
						tags={['JavaScript']}
						ref={useRef(null)}
						{...projectProps}
					>
						<FlipCardFront>
							<Flex flexDir="column" justifyContent="start" h="100%" pt={'12'}>
								<Text {...projTitleProps}>BounceJS</Text>
								<Text {...projSubitleProps}>
									A 2D "bouncy ball" physics library
								</Text>
							</Flex>
						</FlipCardFront>
						<FlipCardBack>
							<Flex flexDir="column" justifyContent="center" h="100%">
								<Text m="10px" color="gray.600">
									BounceJS is a small physics library made with vanilla
									JavaScript that animates circles on an HTML canvas. You saw it
									in action on the home page. <br /> <br />
									<Link
										color={colorTheme + '.400'}
										href="./bouncejs/demo/index.html"
									>
										Here's a fun demo{' '}
										<ArrowRightIcon w={3} h={3} color={colorTheme + '.400'} />
									</Link>
									<br />
									<Link
										color={colorTheme + '.400'}
										href="https://github.com/benrbowers/bouncejs"
									>
										Here's the code{' '}
										<ArrowRightIcon w={3} h={3} color={colorTheme + '.400'} />
									</Link>
								</Text>
							</Flex>
						</FlipCardBack>
					</ProjectCard>

					<ProjectCard
						tags={['JavaScript', 'HTML', 'CSS']}
						ref={useRef(null)}
						{...projectProps}
					>
						<FlipCardFront>
							<Flex flexDir="column" justifyContent="start" h="100%" pt={'12'}>
								<Text {...projTitleProps}>Sticky Notes</Text>
								<Text {...projSubitleProps}>
									A drag and drop note taking app
								</Text>
							</Flex>
						</FlipCardFront>
						<FlipCardBack>
							<Flex flexDir="column" justifyContent="center" h="100%">
								<Text m="10px" color="gray.600">
									Sticky Notes is a note taking app made with vanilla
									JavaScript, HTML, and CSS. It features color changing, drag
									and drop, and reorder animations.
									<br /> <br />
									<Link
										color={colorTheme + '.400'}
										href="./sticky-notes/index.html"
									>
										Stick some notes{' '}
										<ArrowRightIcon w={3} h={3} color={colorTheme + '.400'} />
									</Link>
									<br />
									<Link
										color={colorTheme + '.400'}
										href="https://github.com/benrbowers/sticky-notes"
									>
										See how they're stuck{' '}
										<ArrowRightIcon w={3} h={3} color={colorTheme + '.400'} />
									</Link>
								</Text>
							</Flex>
						</FlipCardBack>
					</ProjectCard>

					<ProjectCard
						tags={['HTML', 'CSS', 'JavaScript', 'PHP']}
						ref={useRef(null)}
						{...projectProps}
					>
						<FlipCardFront>
							<Flex flexDir="column" justifyContent="start" h="100%" pt={'12'}>
								<Text {...projTitleProps}>Chore Board</Text>
								<Text {...projSubitleProps}>A local hosted chore board</Text>
							</Flex>
						</FlipCardFront>
						<FlipCardBack>
							<Flex flexDir="column" justifyContent="center" h="100%" w="100%">
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
							</Flex>
						</FlipCardBack>
					</ProjectCard>

					<ProjectCard
						tags={['TypeScript', 'NextJS', 'React']}
						ref={useRef(null)}
						{...projectProps}
					>
						<FlipCardFront>
							<Flex flexDir="column" justifyContent="start" h="100%" pt={'12'}>
								<Text {...projTitleProps}>This Site</Text>
								<Text {...projSubitleProps}>
									The website you're on right now
								</Text>
							</Flex>
						</FlipCardFront>
						<FlipCardBack>
							<Flex flexDir="column" justifyContent="center" h="100%">
								<Text m="10px" color="gray.600">
									The website you're viewing right now was made with TypeScript,
									NextJS, ReactJS, and ChakraUI.
									<br /> <br />
									<Link
										color={colorTheme + '.400'}
										href="https://github.com/benrbowers/benbowers.net.v2"
									>
										Here's the code{' '}
										<ArrowRightIcon w={3} h={3} color={colorTheme + '.300'} />
									</Link>
								</Text>
							</Flex>
						</FlipCardBack>
					</ProjectCard>

					<ProjectCard
						tags={['GDScript', 'Cpp']}
						ref={useRef(null)}
						{...projectProps}
					>
						<FlipCardFront>
							<Flex flexDir="column" justifyContent="start" h="100%" pt={'12'}>
								<Text {...projTitleProps}>Fractal Generator</Text>
								<Text {...projSubitleProps}>A minecraft prototyping tool</Text>
							</Flex>
						</FlipCardFront>
						<FlipCardBack>
							<Flex h="100%" w="100%">
								<Text m="10px" color="gray.600">
									This was built with GDScript (similar to Python) and C++ in
									the Godot game engine. It recursively generates cube fractals
									using different Minecraft textures.
									<br /> <br />
									<Link color={colorTheme + '.400'} href="./fractal/index.html">
										Make some fractals{' '}
										<ArrowRightIcon w={3} h={3} color={colorTheme + '.400'} />
									</Link>
									<br />
									<Link
										color={colorTheme + '.400'}
										href="https://github.com/benrbowers/cube-fractal-generator"
									>
										Look under the hood{' '}
										<ArrowRightIcon w={3} h={3} color={colorTheme + '.400'} />
									</Link>
								</Text>
							</Flex>
						</FlipCardBack>
					</ProjectCard>
				</AnimateCards>
			</Layout>
		</>
	);
};

export default Projects;
