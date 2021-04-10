import { Box, Link, LinkProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { MouseEvent, TouchEvent, useEffect, useState } from 'react';

interface NavBarProps {

};

export const NavBar: React.FC<NavBarProps> = ({}) => {

    const homeColor = 'red';
    const projColor = 'green';
    const conColor = 'blue';

    const [current, setCurrent] = useState('');
    
    const page = useRouter().pathname;
    useEffect(() => {

        if (current !== '') {
            setToCurrent();
        } else if (page === '/') {
            setCurrent('#homeLink');
        } else if (page === '/projects') {
            setCurrent('#projectsLink');
        } else if (page === '/contact') {
            setCurrent('#contactLink');
        }
    });

    const animateBar = (e: MouseEvent<HTMLAnchorElement> | TouchEvent<HTMLAnchorElement>) => {
        let underBar = document.querySelector('.underBar') as HTMLDivElement;
        const link = e.target as HTMLAnchorElement;
    
        if (underBar.style.width === '') {
            underBar.style.width = '20px'
        }
        
        underBar.style.left = link.offsetLeft + 'px';
        underBar.style.width = link.offsetWidth + 'px';
    
        if (link.id === 'homeLink') {
            underBar.style.backgroundColor = homeColor;
        } else if (link.id === 'projectsLink') {
            underBar.style.backgroundColor = projColor;
        } else if (link.id === 'contactLink') {
            underBar.style.backgroundColor = conColor;
        }
    }
    
    const setToCurrent = () => {
        const underBar = document.querySelector('.underBar') as HTMLDivElement;
        const currentLink = document.querySelector(current /*From state*/) as HTMLAnchorElement;
    
        underBar.style.left = currentLink.offsetLeft + 'px';
        underBar.style.width = currentLink.offsetWidth + 'px';
        
        if (currentLink.id === 'homeLink') {
            underBar.style.backgroundColor = homeColor;
        } else if (currentLink.id === 'projectsLink') {
            underBar.style.backgroundColor = projColor;
        } else if (currentLink.id === 'contactLink') {
            underBar.style.backgroundColor = conColor;
        }
    };

    const setAsCurrent = (e: MouseEvent<HTMLAnchorElement> | TouchEvent<HTMLAnchorElement>) => {
        const link = e.currentTarget;

        console.log(link);

        setCurrent('#' + link.id);
    };

    const linkProps: LinkProps = {
        mx: 2,
        pb: "3px",
        fontSize: "x-large",
        onMouseEnter: animateBar,
        onTouchStart: animateBar,
        _hover: {textDecoration: "none"},
        _active: {textDecoration: "none", opacity: 0.3},
        onClick: setAsCurrent,
        color: "gray.600",
    }

    return (
        <Box>
            <Box display="inline-block" onMouseLeave={setToCurrent}>
                <NextLink  href="/">
                    <Link id="homeLink" {...linkProps}>Home</ Link>
                </NextLink>
                <NextLink href="/projects">
                    <Link id="projectsLink" {...linkProps}>Projects</Link>
                </NextLink>
                <NextLink href="/contact">
                    <Link id="contactLink" {...linkProps}>Contact</Link>
                </NextLink>
            </Box>
            <Box 
                pos="relative"
                w="50px" 
                h="3px" 
                className="underBar"
                bgColor={homeColor}
                left="0px"
                bottom="5px"
                transition="0.4s ease"
            ></Box>
        </Box>
    );
};