import { Engine } from './bouncejs/Engine.js';
import { Ball } from './bouncejs/Ball.js';
import { Vector2 } from './bouncejs/Vector2.js';
import chakraColors from './chakraColors.js';

export function initBallEngine() {
	const canvas = document.querySelector('canvas');

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	console.log('set canvas size');

	canvas.onclick = () => {
		console.log('click');
	};

	let color;
	if (document.cookie) {
		color = document.cookie.split('=')[1];
	} else {
		color = 'cyan';
	}
	console.log('colorTheme: ', color);

	let engine = new Engine(canvas, 'white');

	const navBallImgs = ['GitHub-Mark-Light-120px-plus.png', 'In-White-128.png'];
	const navBalls = [];
	const throwBalls = [];

	const a = window.innerHeight * window.innerWidth;
	const bgBallPcnt = 4; // Percentage of area ball will take up

	// Generate balls and put them into the `navBalls` object, using text as the key
	for (let i = 0; i < navBallImgs.length; i++) {
		const navBall = new Ball();
		navBall.color = chakraColors[color][400];
		navBall.radius = Math.sqrt((bgBallPcnt * a) / (100 * Math.PI));
		navBall.mass = (4 / 3) * Math.PI * navBall.radius ** 3;
		navBall.position.x = Math.random() * window.innerWidth;
		navBall.position.y = Math.random() * window.innerHeight;
		navBall.velocity.x = Math.random() * -200 + 100;
		navBall.velocity.y = Math.random() * -200 + 100;

		navBall.onObjectCollison = () => {
			console.log('collision');
		};

		navBalls[i] = navBall;
		engine.add(navBall);
	}

	const smBallPcnt = 2; // Percentage of area ball will take up
	const numThrowBalls = 10;

	for (let i = 1; i <= numThrowBalls; i++) {
		const throwBall = new Ball();
		throwBall.color = chakraColors[color][i % 2 ? 200 : 600]; // Alternate between light and dark
		throwBall.radius =
			Math.sqrt((smBallPcnt * a) / (100 * Math.PI)) / 2 +
			(Math.sqrt((smBallPcnt * a) / (100 * Math.PI)) / 2) * (i / numThrowBalls);
		// (Math.random() * Math.sqrt((smBallPcnt * a) / (100 * Math.PI))) / 2 +
		// Math.sqrt((smBallPcnt * a) / (100 * Math.PI)) / 2;
		throwBall.mass = (4 / 3) * Math.PI * throwBall.radius ** 3;
		throwBall.position.x = Math.random() * window.innerWidth;
		throwBall.position.y = Math.random() * window.innerHeight;
		throwBall.velocity.x = Math.random() * -350 + 175; //-((a / 3000) * 2) + a / 3000;
		throwBall.velocity.y = Math.random() * -350 + 175; //-((a / 3000) * 2) + a / 3000;

		throwBalls[i] = throwBall;

		engine.add(throwBall);
	}

	const grabMeBall = new Ball();
	grabMeBall.color = chakraColors[color][600];
	grabMeBall.radius = Math.sqrt((smBallPcnt * a) / (100 * Math.PI));
	grabMeBall.mass = (4 / 3) * Math.PI * grabMeBall.radius ** 3;
	grabMeBall.position.x = Math.random() * window.innerWidth;
	grabMeBall.position.y = Math.random() * window.innerHeight;
	grabMeBall.velocity.x = Math.random() * -350 + 175;
	grabMeBall.velocity.y = Math.random() * -350 + 175;
	engine.add(grabMeBall);

	document.querySelectorAll('.colorOption').forEach((option) => {
		option.addEventListener('click', (e) => {
			const value = e.currentTarget.value;
			const newColor = chakraColors[value];

			navBalls.forEach((ball) => {
				ball.color = newColor[400];
			});

			throwBalls.forEach((ball, i) => {
				ball.color = newColor[i % 2 ? 200 : 600];
			});

			grabMeBall.color = newColor[600];
		});
	});

	let settingsActive = false;
	document.querySelector('.settingsButton').addEventListener('click', () => {
		settingsActive = !settingsActive;
	});

	document.querySelector('.smBallPcnt').addEventListener('keydown', (e) => {
		if (e.key === 'Enter') {
			if (isNaN(parseFloat(e.currentTarget.value))) {
				console.log(e.currentTarget.value, ' is not a number');
			} else {
				const p = parseFloat(e.currentTarget.value);
				throwBalls.forEach((ball) => {
					ball.radius =
						(Math.random() * Math.sqrt((p * a) / (100 * Math.PI))) / 2 +
						Math.sqrt((p * a) / (100 * Math.PI)) / 2;
				});
			}
		}
	});

	document.querySelector('.lgBallPcnt').addEventListener('keydown', (e) => {
		if (e.key === 'Enter') {
			if (isNaN(parseFloat(e.currentTarget.value))) {
				console.log(e.currentTarget.value, ' is not a number');
			} else {
				const p = parseFloat(e.currentTarget.value);
				navBalls.forEach((ball) => {
					ball.radius = Math.sqrt((p * a) / (100 * Math.PI));
				});
			}
		}
	});

	let showGrabMe = false;
	let showThrowMe = false;

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

		const offset = grabMeBall.radius / Math.sqrt(2);
		const x = grabMeBall.position.x - offset;
		const y = grabMeBall.position.y - offset;

		const grabMeImg = document.createElement('img');
		grabMeImg.src = '/static/ballLogos/grabMe.svg';

		const throwMeImg = document.createElement('img');
		throwMeImg.src = '/static/ballLogos/throwMe.svg';

		const canvas2D = canvas.getContext('2d');

		if (showThrowMe) {
			canvas2D.drawImage(
				throwMeImg,
				x - offset * 0.25,
				y - offset * 0.05,
				offset * 2.5,
				offset * 2.5
			);
		} else if (showGrabMe) {
			canvas2D.drawImage(grabMeImg, x, y, offset * 2, offset * 2);
		}

		document.body.style.cursor = 'default';
		engine.physObjects.forEach((ball) => {
			if (
				ball.position.distance(engine.mousePos) < ball.radius &&
				!(settingsActive && engine.mousePos.x < 300)
			) {
				if (navBalls.includes(ball)) {
					document.body.style.cursor = 'pointer';
				} else {
					document.body.style.cursor = 'grab';
				} //end else
			} //end if
		}); //end for each

		if (
			engine.selectedObject !== null &&
			!(settingsActive && engine.mousePos.x < 300)
		) {
			document.body.style.cursor = 'grabbing';
		}
	});

	let grabMeIsActive = false;
	engine.setOnObjectPress(() => {
		if (!(settingsActive && engine.mousePos.x < 300)) {
			if (engine.selectedObject === navBalls[0]) {
				window.open('https://github.com/benrbowers', '_blank');
				engine.selectedObject = null;
			} else if (engine.selectedObject === navBalls[1]) {
				window.open(
					'https://www.linkedin.com/in/ben-bowers-07154417a/',
					'_blank'
				);
				engine.selectedObject = null;
			} else if (grabMeIsActive && engine.selectedObject === grabMeBall) {
				showThrowMe = true;
			}
		}
	});

	let userHasThrown = false;
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

				if (engine.mouseVel.magnitude > 100) {
					userHasThrown = true;

					console.log('User threw');

					if (grabMeIsActive && engine.selectedObject === grabMeBall) {
						showGrabMe = false;
						showThrowMe = false;
						grabMeIsActive = false;
					}
				}
			} else {
				engine.selectedObject.velocity = new Vector2(0, 0);
			}
		}
	});

	engine.setWhileObjectHeld(() => {
		if (!(settingsActive && engine.mousePos.x < 300)) {
			engine.selectedObject.velocity.x = 0;
			engine.selectedObject.velocity.y = 0;

			engine.selectedObject.position.x = engine.mousePos.x;
			engine.selectedObject.position.y = engine.mousePos.y;
		}
	});

	engine.start();
	console.log('engine started');

	setTimeout(() => {
		if (!userHasThrown) {
			grabMeIsActive = true;
			const grabMeInterval = setInterval(() => {
				if (grabMeIsActive) {
					showGrabMe = !showGrabMe;
				} else {
					showGrabMe = false;
					clearInterval(grabMeInterval);
				}
			}, 500);
		}
	}, 5000);

	return engine;
}
