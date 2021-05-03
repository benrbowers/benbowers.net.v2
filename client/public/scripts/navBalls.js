import { Engine } from './bouncejs/Engine.js';
import { Ball } from './bouncejs/Ball.js';
import { Vector2 } from './bouncejs/Vector2.js';
import chakraColors from './chakraColors.js';

let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let color;
if (document.cookie) {
	color = document.cookie.split('=')[1];
} else {
	color = 'teal';
}
console.log('colorTheme: ', color);

let engine = new Engine(
	canvas,
	getComputedStyle(document.body).backgroundColor
);

const navBallImgs = ['GitHub-Mark-Light-120px-plus.png', 'In-White-128.png'];
const navBalls = [];
const throwBalls = [];

// Generate balls and put them into the `navBalls` object, using text as the key
for (let i = 0; i < navBallImgs.length; i++) {
	const navBall = new Ball();
	navBall.color = chakraColors[color][400];
	navBall.radius = 125;
	navBall.mass = (4 / 3) * Math.PI * navBall.radius ** 3;
	navBall.position.x = Math.random() * window.innerWidth;
	navBall.position.y = Math.random() * window.innerHeight;
	navBall.velocity.x = Math.random() * -400 + 200;
	navBall.velocity.y = Math.random() * -400 + 300;

	navBalls[i] = navBall;
	engine.add(navBall);
}

for (let i = 0; i < 15; i++) {
	const throwBall = new Ball();
	throwBall.color = chakraColors[color][i % 2 ? 300 : 500]; // Alternate between light and dark
	throwBall.radius = Math.random() * 50 + 30; // Radius between 30 and 80;
	throwBall.mass = (4 / 3) * Math.PI * throwBall.radius ** 3;
	throwBall.position.x = Math.random() * window.innerWidth;
	throwBall.position.y = Math.random() * window.innerHeight;
	throwBall.velocity.x = Math.random() * -600 + 300;
	throwBall.velocity.y = Math.random() * -600 + 300;

	throwBalls[i] = throwBall;

	engine.add(throwBall);
}

document.querySelector('.colorThemeInput').addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		const text = e.currentTarget.value;
		const newColor = chakraColors[text];
		navBalls.forEach((ball) => {
			ball.color = newColor[400];
		});

		throwBalls.forEach((ball, i) => {
			ball.color = newColor[i % 2 ? 200 : 600];
		});
	}
});

// Add images to the navBalls every frame
engine.setOnFrame(() => {
	for (let i = 0; i < navBallImgs.length; i++) {
		const offset = (navBalls[i].radius / Math.sqrt(2)) * (1 - i * 0.15);
		const x = navBalls[i].position.x - offset;
		const y = navBalls[i].position.y - offset;

		const img = document.createElement('img');
		img.src = '/static/ballLogos/' + navBallImgs[i];

		const canvas2D = canvas.getContext('2d');
		canvas2D.drawImage(img, x, y, offset * 2, offset * 2);
	}

	document.body.style.cursor = 'default';
	engine.physObjects.forEach((ball) => {
		if (ball.position.distance(engine.mousePos) < ball.radius) {
			if (navBalls.includes(ball)) {
				document.body.style.cursor = 'pointer';
			} else {
				document.body.style.cursor = 'grab';
			} //end else
		} //end if
	}); //end for each

	if (engine.selectedObject !== null) {
		document.body.style.cursor = 'grabbing';
	}
});

engine.setOnObjectPress(() => {
	if (engine.selectedObject == navBalls[0]) {
		window.open('https://github.com/benrbowers', '_blank');
		engine.selectedObject = null;
	} else if (engine.selectedObject == navBalls[1]) {
		window.open('https://www.linkedin.com/in/ben-bowers-07154417a/', '_blank');
		engine.selectedObject = null;
	}
});

engine.setOnObjectRelease(() => {
	if (engine.selectedObject !== null) {
		//Time since last mouse movement
		if (engine.mouseTimeStamp != 0) {
			engine.mouseElapsedTime = (Date.now() - engine.mouseTimeStamp) / 1000;
		}

		if (engine.mouseElapsedTime < 0.03) {
			//Ensure a recent velocity is used
			engine.selectedObject.velocity = new Vector2(
				engine.mouseVel.x,
				engine.mouseVel.y
			);
		} else {
			engine.selectedObject.velocity = new Vector2(0, 0);
		}
	}
});

engine.setWhileObjectHeld(() => {
	engine.selectedObject.velocity.x = 0;
	engine.selectedObject.velocity.y = 0;

	engine.selectedObject.position.x = engine.mousePos.x;
	engine.selectedObject.position.y = engine.mousePos.y;
});

engine.start();
console.log('engine started');
