import { Box, BoxProps, Link, LinkProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, {
	MouseEvent,
	TouchEvent,
	useEffect,
	useState,
	useContext,
} from 'react';
import { ThemeContext } from '../themes/theme';

type NavBarProps = BoxProps;

export const NavBar: React.FC<NavBarProps> = (props) => {
	// const homeColor = 'red';
	// const projColor = 'green';
	// const conColor = 'blue';

	const { colorTheme } = useContext(ThemeContext);

	type LinkIDs = '#homeLink' | '#projectsLink' | '#contactLink' | '';

	const [current, setCurrent] = useState('' as LinkIDs);
	const [temp, setTemp] = useState('' as LinkIDs);

	const page = useRouter().pathname;
	useEffect(() => {
		if (current !== '') {
			animateBar();
		} else if (page === '/') {
			setCurrent('#homeLink');
		} else if (page === '/projects') {
			setCurrent('#projectsLink');
		} else if (page === '/contact') {
			setCurrent('#contactLink');
		}
	});

	const animateBar = () => {
		const underBar = document.querySelector('.underBar') as HTMLDivElement;
		let link: HTMLAnchorElement;
		if (temp === '') {
			link = document.querySelector(current) as HTMLAnchorElement;
		} else {
			link = document.querySelector(temp) as HTMLAnchorElement;
		}
		const container = link.parentNode as HTMLDivElement;

		if (underBar.style.width === '') {
			underBar.style.width = '20px';
		}

		underBar.style.left =
			link.getBoundingClientRect().left -
			container.getBoundingClientRect().left +
			'px';
		underBar.style.width = link.offsetWidth + 'px';
	};

	const setAsCurrent = (
		e: MouseEvent<HTMLAnchorElement> | TouchEvent<HTMLAnchorElement>
	) => {
		const link = e.currentTarget;

		setCurrent(('#' + link.id) as LinkIDs);
	};

	const setAsTemp = (
		e: MouseEvent<HTMLAnchorElement> | TouchEvent<HTMLAnchorElement>
	) => {
		const link = e.currentTarget;

		setTemp(('#' + link.id) as LinkIDs);
	};

	const linkProps: LinkProps = {
		mx: 2,
		pb: '3px',
		fontSize: ['x-large', 'xx-large'],
		onMouseEnter: setAsTemp,
		onTouchStart: setAsTemp,
		_hover: { textDecoration: 'none' },
		_active: { textDecoration: 'none', opacity: 0.3 },
		onClick: setAsCurrent,
		color: 'gray.500',
	};

	const colorGradients = {
		'#homeLink': '.200',
		'#projectsLink': '.400',
		'#contactLink': '.600',
	};

	return (
		<Box {...props}>
			<Box
				display="inline-block"
				onMouseLeave={() => {
					setTemp('');
				}}
			>
				<NextLink href="/">
					<Link id="homeLink" {...linkProps}>
						Home
					</Link>
				</NextLink>
				<NextLink href="/projects">
					<Link id="projectsLink" {...linkProps}>
						Projects
					</Link>
				</NextLink>
				<NextLink href="/contact">
					<Link id="contactLink" {...linkProps}>
						Contact
					</Link>
				</NextLink>
			</Box>
			<Box
				pos="relative"
				w="50px"
				h="3px"
				className="underBar"
				bgColor={
					colorTheme +
					(temp ? colorGradients[temp] : current ? colorGradients[current] : '')
				}
				left="0px"
				bottom="5px"
				transition="0.4s ease"
			></Box>
		</Box>
	);
};
