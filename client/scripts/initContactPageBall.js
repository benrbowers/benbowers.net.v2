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
	let formWidth = parseInt(getComputedStyle(contactForm).width);
	const gravity = 100.0;

	const contactBall = new Ball();
	contactBall.color = chakraColors[colorTheme][400];
	contactBall.radius = formWidth / Math.sqrt(2);
	contactBall.position.x = window.innerWidth / 2;
	contactBall.position.y = window.innerHeight / 2;
	contactBall.gravity = gravity;
	contactBall.drag = 0.02;
	engine.add(contactBall);

	engine.setOnFrame(() => {
		const x = contactBall.position.x - formWidth / 2;
		const y = contactBall.position.y - formWidth / 2;

		contactForm.style.transform = `translate(${x}px, ${y}px)`;
	});

	const onResize = () => {
		if (window.innerHeight <= contactBall.radius * 2) {
			contactBall.velocity.y = 0;
			contactBall.gravity = 0;
		} else {
			contactBall.gravity = gravity;
		}

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		engine.width = window.innerWidth;
		engine.height = window.innerHeight;

		if (contactBall.position.y < canvas.height / 2) {
			contactBall.position.y = canvas.height / 2;
		}

		formWidth = parseInt(getComputedStyle(contactForm).width);
		contactBall.radius = formWidth / Math.sqrt(2);
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

	document.querySelectorAll('.contactInput').forEach((input) => {
		input.addEventListener('focus', () => {
			contactBall.gravity = 0.0;
			contactBall.velocity.y = 0.0;
		});

		input.addEventListener('focusout', () => {
			if (window.innerHeight > contactBall.radius * 2) {
				contactBall.gravity = gravity;

				const initEnergy = (gravity * canvas.height) / 2;
				const h = canvas.height - contactBall.position.y;
				console.log(initEnergy - gravity * h);
				const velocity = Math.sqrt(initEnergy - gravity * h);
				contactBall.velocity.y = velocity;
			}
		});
	});

	document.querySelector('form').addEventListener('submit', () => {
		contactBall.gravity = gravity;
	});

	engine.onStop = () => {
		window.removeEventListener('resize', onResize);
	};

	engine.start();

	return engine;
}
