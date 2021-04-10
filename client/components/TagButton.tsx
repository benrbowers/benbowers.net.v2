import { Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React, {useState} from 'react';
import { Tag } from './ProjectCard';
import styles from './TagButton.module.css';

export interface TagButtonProps {
    tag: Tag;
    iconSize?: number;
    fontSize?: 'sm' | 'md' | 'lg' | 'x-large' | string;
};

export const TagButton: React.FC<TagButtonProps> = ({tag, iconSize = 30, fontSize='md'}) => {

    const [selected, setSelected] = useState(false);

    const selectCards = () => {
        const allCards = document.querySelectorAll('.projectCard') as NodeListOf<HTMLDivElement>; // All project cards on the page
        const selectedCards = document.querySelectorAll('.' + tag) as NodeListOf<HTMLDivElement>; // Cards that have the selected tag

        // Hide all non-selected cards
        allCards.forEach((card) => {
            if ( ! card.className.includes(tag)) {
                card.style.display = 'none';
            }
        });
    }

    return (
        <Box 
            className={styles.tagButton} 
            borderRadius={(iconSize / 2) + 'px'}
            bgColor={selected ? 'gray' : 'darkgray'}
            onClick={selectCards}
        >
            <Box className={styles.imageContainer}>
                <Image
                    src={'/static/' + tag + '.png'}
                    width={iconSize}
                    height={iconSize}
                />
            </Box>
            <Text className={styles.tagText} fontSize={fontSize}>{tag}</Text>
        </Box>
    );
};