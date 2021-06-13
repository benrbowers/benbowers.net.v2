import { Engine } from './bouncejs/Engine.js';
import { Ball } from './bouncejs/Ball.js';
import chakraColors from './chakraColors.js';

export function initContactPageBall() {
	const canvas = document.querySelector('canvas');

	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;

	const engine = new Engine(canvas, 'white');

	let colorTheme = '';
	if (document.cookie) {
		document.cookie.split('; ').forEach((cookie) => {
			if (cookie.split('=')[0] === 'colorTheme') {
				colorTheme = cookie.split('=')[1];
			}
		});
	}

	/** @type {HTMLDivElement} */
	const contactForm = document.querySelector('.contactForm');

	let formLength = parseInt(getComputedStyle(contactForm).width);

	const contactBall = new Ball();
	contactBall.color = chakraColors[colorTheme][400];
	contactBall.radius = formLength / Math.sqrt(2);
	contactBall.position.x = window.innerWidth / 2;
	contactBall.position.y = window.innerHeight / 2;
	contactBall.gravity = 100;
	contactBall.drag = 0.02;
	engine.add(contactBall);

	engine.setOnFrame(() => {
		const x = contactBall.position.x - formLength / 2;
		const y = contactBall.position.y - formLength / 2;

		contactForm.style.transform = `translate(${x}px, ${y}px)`;
	});

	const onResize = () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		engine.width = window.innerWidth;
		engine.height = window.innerHeight;

		formLength = parseInt(getComputedStyle(contactForm).width);
		contactBall.radius = formLength / Math.sqrt(2);
		contactBall.position.x = window.innerWidth / 2;
	};

	window.addEventListener('resize', onResize);

	document.querySelectorAll('.colorOption').forEach((option) => {
		option.addEventListener('click', (e) => {
			const value = e.currentTarget.value;
			const newColor = chakraColors[value];

			contactBall.color = newColor[400];
		});
	});

	engine.onStop = () => {
		window.removeEventListener('resize', onResize);
	};

	engine.start();

	return engine;
}
