import NextImg from 'next/image';
import React from 'react';

export type Tag = 'js' | 'ts' | 'html' | 'css' | 'react' | 'php';

interface ProjectCardProps {
    tags?: Tag[];
};

export const ProjectCard: React.FC<ProjectCardProps> = ({}) => {

    return (
        // <FlipCard>
        //     {children}
        //     {tags.map((tag, key) => (
        //         <Box position="absolute" display="inline-block" key={key}>
        //             <NextImg
        //                 src={'/' + tag + '.png'}
        //                 width={15}
        //                 height={15}
        //             />
        //         </Box>
        //     ))}
        // </FlipCard>

        <NextImg src="/css.png" height={48} width={48}/>
    );
};