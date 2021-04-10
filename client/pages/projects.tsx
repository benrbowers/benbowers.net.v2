import { Box, Center, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { FlipCardBack } from '../components/FlipCardBack';
import { FlipCardFront } from '../components/FlipCardFront';
import { Layout } from '../components/Layout';
import { ProjectCard, ProjectCardProps } from '../components/ProjectCard';
import { TagButton, TagButtonProps } from '../components/TagButton';

const projectProps: ProjectCardProps = {
    w: "250px",
    h: "250px",
    m: "20px",
    borderRadius: "25px",
    doesFlipOnHover: true,
    doesFlipOnTap: true,
    iconSize: 40,
}

const tagButtonProps = {
    iconSize: 40,
    fontSize: "lg",
}

const Projects = () => (
    <Layout>
        <Box>
            <TagButton tag="HTML" {...tagButtonProps}/>
            <TagButton tag="CSS" {...tagButtonProps}/>
            <TagButton tag="JavaScript" {...tagButtonProps}/>
            <TagButton tag="TypeScript" {...tagButtonProps}/>
            <TagButton tag="React" {...tagButtonProps}/>
            <TagButton tag="NextJS" {...tagButtonProps}/>
            <TagButton tag="GDScript" {...tagButtonProps}/>
            <TagButton tag="C++" {...tagButtonProps}/>
        </Box>
        <Box mx="20px">
            <ProjectCard tags={["JavaScript"]} {...projectProps}>
                <FlipCardFront>
                    <Center h="100%">
                        <Text color="gray.500" fontSize="xx-large">BounceJS</Text>
                    </Center>
                </FlipCardFront>
                <FlipCardBack>
                    <Center h="100%">
                        <Text m="10px" color="gray.600">
                            BounceJS is a small physics library made with vanilla JavaScript
                            that animates circles on an HTML canvas.
                            You saw it in action on the home page. <br/> <br/>

                            Here's the code: <br/>
                            <Link color="blue.400" href="https://github.com/benrbowers/bouncejs">GitHub</Link>
                        </Text>
                    </Center>
                </FlipCardBack>
            </ProjectCard>

            <ProjectCard tags={["JavaScript", "HTML", "CSS"]} {...projectProps}>
                <FlipCardFront>
                    <Center h="100%">
                        <Text color="gray.500" fontSize="xx-large">Sticky Notes</Text>
                    </Center>
                </FlipCardFront>
                <FlipCardBack>
                    <Center h="100%">
                        <Text m="10px" color="gray.600">
                            Sticky Notes is a note taking app made with vanilla JavaScript, HTML, and CSS.
                            <br/> <br/>

                            Here's the code: <br/>
                            <Link color="blue.400" href="https://github.com/benrbowers/sticky-notes">GitHub</Link>
                        </Text>
                    </Center>
                </FlipCardBack>
            </ProjectCard>

            <ProjectCard tags={["GDScript", "C++"]} {...projectProps}>
                <FlipCardFront>
                    <Center h="100%">
                        <Text color="gray.500" fontSize="xx-large" textAlign="center">Cube Fractal Generator</Text>
                    </Center>
                </FlipCardFront>
                <FlipCardBack>
                    <Center h="100%" w="100%">
                        <Text m="10px" color="gray.600">
                            This was built with GDScript (similar to Python) and C++
                            in the Godot game engine. It recursively generates cube fractals
                            using different Minecraft textures.
                            <br/> <br/>

                            Here's the code: <br/>
                            <Link color="blue.400" href="https://github.com/benrbowers/cube-fractal-generator">GitHub</Link>
                        </Text>
                    </Center>
                </FlipCardBack>
            </ProjectCard>

            <ProjectCard tags={["TypeScript", "NextJS", "React"]} {...projectProps}>
                <FlipCardFront>
                    <Center h="100%">
                        <Text color="gray.500" fontSize="xx-large">This Site</Text>
                    </Center>
                </FlipCardFront>
                <FlipCardBack>
                    <Center h="100%">
                        <Text m="10px" color="gray.600">
                            The website you're viewing right now was made with TypeScript, NextJS, and ReactJS
                            <br/> <br/>

                            Here's the code: <br/>
                            <Link color="blue.400" href="https://github.com/benrbowers/benbowers.net.v2">GitHub</Link>
                        </Text>
                    </Center>
                </FlipCardBack>
            </ProjectCard>

        </Box>
    </Layout>
);

export default Projects;
