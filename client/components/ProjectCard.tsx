import { Box } from '@chakra-ui/react';
import NextImg from 'next/image';
import React from 'react';
import { FlipCard, FlipCardProps } from './FlipCard';
import styles from './FlipCard.module.css'

export type Tag = 'JavaScript' | 'TypeScript' | 'HTML' | 'CSS' | 'React' | 'php' | 'GDScript' | 'NextJS' | 'C++';

export interface ProjectCardProps extends FlipCardProps {
    tags?: Tag[];
    iconSize?: number;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({children, tags, iconSize = 30, ...props}) => {

    let className = '';

    tags?.forEach((tag, count) => {
        if (count < tags.length - 1) {
            className += (tag + ' ');
        } else {
            className += tag;
        }
    });

    className += ' projectCard';

    console.log('className: ', className);

    return (
        <FlipCard {...props} className={className}>
            {children}
            <Box className={styles.tagContainer}>
                {tags?.map((tag, key) => ( 
                    <NextImg
                        src={'/static/' + tag + '.png'}
                        width={iconSize}
                        height={iconSize}
                        key={key}
                        className={styles.tagImage}
                    />
                ))}
            </Box>
        </FlipCard>
    );
};
