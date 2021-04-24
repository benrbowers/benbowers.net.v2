import { Center, Flex, Link, Text, TextProps } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { AnimateCards } from '../components/AnimateCards';
import { FlipCardBack } from '../components/FlipCardBack';
import { FlipCardFront } from '../components/FlipCardFront';
import { Layout } from '../components/Layout';
import { ProjectCard, ProjectCardProps } from '../components/ProjectCard';
import { TagButton, TagButtonProps } from '../components/TagButton';
import { Tag } from '../types/Tag';

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
			</Flex>
			<AnimateCards
				selectedTags={selectedTags}
				animationDuration={0.7}
				gridTemplateColumns="repeat(auto-fit, 250px)"
				justifyContent="center"
				gridGap="40px"
				mt="40px"
			>
				<ProjectCard tags={['JavaScript']} ref={useRef(null)} {...projectProps}>
					<FlipCardFront>
						<Center h="100%">
							<Text {...projTitleProps}>BounceJS</Text>
						</Center>
					</FlipCardFront>
					<FlipCardBack>
						<Center h="100%">
							<Text m="10px" color="gray.600">
								BounceJS is a small physics library made with vanilla JavaScript
								that animates circles on an HTML canvas. You saw it in action on
								the home page. <br /> <br />
								Here's the code: <br />
								<Link
									color="blue.400"
									href="https://github.com/benrbowers/bouncejs"
								>
									GitHub
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
								Sticky Notes is a note taking app made with vanilla JavaScript,
								HTML, and CSS.
								<br /> <br />
								Here's the code: <br />
								<Link
									color="blue.400"
									href="https://github.com/benrbowers/sticky-notes"
								>
									GitHub
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
								This was built with GDScript (similar to Python) and C++ in the
								Godot game engine. It recursively generates cube fractals using
								different Minecraft textures.
								<br /> <br />
								Here's the code: <br />
								<Link
									color="blue.400"
									href="https://github.com/benrbowers/cube-fractal-generator"
								>
									GitHub
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
								Here's the code: <br />
								<Link
									color="blue.400"
									href="https://github.com/benrbowers/benbowers.net.v2"
								>
									GitHub
								</Link>
							</Text>
						</Center>
					</FlipCardBack>
				</ProjectCard>
			</AnimateCards>
		</Layout>
	);
};

export default Projects;
