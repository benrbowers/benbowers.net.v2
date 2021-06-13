import { Engine } from './bouncejs/Engine.js';
import { Ball } from './bouncejs/Ball.js';
import { Vector2 } from './bouncejs/Vector2.js';
import chakraColors from './chakraColors.js';

export function initHomePageBalls() {
	const canvas = document.querySelector('canvas');

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	console.log('set canvas size');

	let colorTheme = 'cyan'; // Color theme chosen by user.
	let userHasThrown = false; // Whether user has thrown a ball yet

	// Check if there is a color theme set, else set to the default, cyan
	if (document.cookie) {
		document.cookie.split('; ').forEach((cookie) => {
			if (cookie.split('=')[0] === 'colorTheme') {
				colorTheme = cookie.split('=')[1];
			} else if (cookie.split('=')[0] === 'userHasThrown') {
				console.log('There was a userHasThrownCookie');
				userHasThrown = true;
			}
		});
	}
	console.log('colorTheme: ', colorTheme);

	let engine = new Engine(canvas, 'white');

	const navBallImgs = ['GitHub-Mark-Light-120px-plus.png', 'In-White-128.png'];
	const navBalls = [];
	const throwBalls = [];

	let initNetMomentum = 0;

	let a = window.innerHeight * window.innerWidth; // Area of window in pixels^2
	const bgBallPcnt = 4; // Percentage of screen area ball will take up

	// Generate balls that navigate to socials, add them to the engine, and put them into the `navBalls` array
	for (let i = 0; i < navBallImgs.length; i++) {
		const navBall = new Ball();
		navBall.color = chakraColors[colorTheme][400];
		navBall.radius = Math.sqrt((bgBallPcnt * a) / (100 * Math.PI));
		navBall.mass = (4 / 3) * Math.PI * navBall.radius ** 3;
		navBall.position.x = Math.random() * window.innerWidth;
		navBall.position.y = Math.random() * window.innerHeight;
		navBall.velocity.x = Math.random() * -200 + 100;
		navBall.velocity.y = Math.random() * -200 + 100;

		navBalls[i] = navBall;
		engine.add(navBall);

		initNetMomentum += navBall.mass * navBall.velocity.magnitude;
	}

	const smBallPcnt = 2; // Percentage of screen area ball will take up
	const numThrowBalls = 10; // Number of throw balls to add to screen

	// Generate balls for grabbing/throwing, add them to the engine, and put them in the `throwBalls` array
	for (let i = 1; i <= numThrowBalls; i++) {
		const throwBall = new Ball();
		throwBall.color = chakraColors[colorTheme][i % 2 ? 200 : 600]; // Alternate between light and dark
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

		initNetMomentum += throwBall.mass * throwBall.velocity.magnitude;
	}

	//Create the ball that will show "GRAB ME" and then "THROW ME" if user doesn't throw a ball for some time
	const grabMeBall = new Ball();
	grabMeBall.color = chakraColors[colorTheme][600];
	grabMeBall.radius = Math.sqrt((smBallPcnt * a) / (100 * Math.PI));
	grabMeBall.mass = (4 / 3) * Math.PI * grabMeBall.radius ** 3;
	grabMeBall.position.x = Math.random() * window.innerWidth;
	grabMeBall.position.y = Math.random() * window.innerHeight;
	grabMeBall.velocity.x = Math.random() * -350 + 175;
	grabMeBall.velocity.y = Math.random() * -350 + 175;
	engine.add(grabMeBall);
	initNetMomentum += grabMeBall.mass * grabMeBall.velocity.magnitude;

	// Add click event listeners to the color option button to change the color of each ball
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

	// If the settings menu is open, I want to prevent interaction with balls that go underneath
	let settingsActive = false; // Whether the settings menu is open
	document.querySelector('.settingsButton').addEventListener('click', () => {
		settingsActive = !settingsActive;
	});

	document.querySelector('.closeSettings').addEventListener('click', () => {
		settingsActive = false;
	});

	// document.querySelector('.smBallPcnt').addEventListener('keydown', (e) => {
	// 	if (e.key === 'Enter') {
	// 		if (isNaN(parseFloat(e.currentTarget.value))) {
	// 			console.log(e.currentTarget.value, ' is not a number');
	// 		} else {
	// 			const p = parseFloat(e.currentTarget.value);
	// 			throwBalls.forEach((ball) => {
	// 				ball.radius =
	// 					(Math.random() * Math.sqrt((p * a) / (100 * Math.PI))) / 2 +
	// 					Math.sqrt((p * a) / (100 * Math.PI)) / 2;
	// 			});
	// 		}
	// 	}
	// });

	// document.querySelector('.lgBallPcnt').addEventListener('keydown', (e) => {
	// 	if (e.key === 'Enter') {
	// 		if (isNaN(parseFloat(e.currentTarget.value))) {
	// 			console.log(e.currentTarget.value, ' is not a number');
	// 		} else {
	// 			const p = parseFloat(e.currentTarget.value);
	// 			navBalls.forEach((ball) => {
	// 				ball.radius = Math.sqrt((p * a) / (100 * Math.PI));
	// 			});
	// 		}
	// 	}
	// });

	const onResize = () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		engine.width = window.innerWidth;
		engine.height = window.innerHeight;

		a = window.innerWidth * window.innerHeight;

		navBalls.forEach((navBall) => {
			navBall.radius = Math.sqrt((bgBallPcnt * a) / (100 * Math.PI));
		});

		throwBalls.forEach((throwBall, i) => {
			throwBall.radius =
				Math.sqrt((smBallPcnt * a) / (100 * Math.PI)) / 2 +
				(Math.sqrt((smBallPcnt * a) / (100 * Math.PI)) / 2) *
					((i + 1) / numThrowBalls);
		});

		grabMeBall.radius = Math.sqrt((smBallPcnt * a) / (100 * Math.PI));
	};
	window.addEventListener('resize', onResize);
	engine.onStop = () => {
		window.removeEventListener('resize', onResize);
	};

	let showGrabMe = false; // Whether to show the "GRAB ME" text image
	let showThrowMe = false; // Whether to show the "THROW ME" text image

	engine.setOnFrame(() => {
		// Add images to the navBalls every frame
		for (let i = 0; i < navBallImgs.length; i++) {
			const offset = (navBalls[i].radius / Math.sqrt(2)) * (1 - i * 0.15); // Offset to fit square image in a circle
			const x = navBalls[i].position.x - offset; // x coord for image
			const y = navBalls[i].position.y - offset; // y coord for image
			const img = document.createElement('img');
			img.src = '/static/ballLogos/' + navBallImgs[i];
			const canvas2D = canvas.getContext('2d');
			canvas2D.drawImage(img, x, y, offset * 2, offset * 2);
		}

		// Add "GRAB ME" or "THROW ME" images to `grabMeBall` according to `showGrabMe` and `showThrowMe`
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

		// Set mouse cursor based on which ball user is hovering or grabbing
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

		let currentNetMomentum = 0;
		engine.physObjects.forEach((ball) => {
			currentNetMomentum += ball.mass * ball.velocity.magnitude;
		});

		if (currentNetMomentum > initNetMomentum) {
			engine.physObjects.forEach((ball) => {
				ball.drag = 0.3;
			});
		} else {
			engine.physObjects.forEach((ball) => {
				ball.drag = 0.0;
			});
		}
	});

	let grabMeIsActive = false; // Whether `grabMeBall` needs to display text
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
		} else {
			engine.selectedObject = null; // Stop ball interaction if they are under settings menu
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
				const maxVel = 5000;
				if (engine.mouseVel.magnitude > maxVel) {
					engine.selectedObject.velocity.x = engine.mouseVel.unit.x * maxVel;
					engine.selectedObject.velocity.y = engine.mouseVel.unit.y * maxVel;
				} else {
					engine.selectedObject.velocity.x = engine.mouseVel.x;
					engine.selectedObject.velocity.y = engine.mouseVel.y;
				}

				if (engine.mouseVel.magnitude > 100) {
					if (!userHasThrown) {
						const yearFromNow = new Date();
						yearFromNow.setTime(yearFromNow.getTime() + 1000 * 3600 * 24 * 365); // 1 year from now
						document.cookie = `userHasThrown=true; expires=${yearFromNow.toUTCString()} path=/;`;
					}

					userHasThrown = true;
					grabMeIsActive = false;
					showGrabMe = false;
					showThrowMe = false;

					console.log('User threw');
				}
			} else {
				engine.selectedObject.velocity = new Vector2(0, 0);
			}
		}
	});

	// Snap ball to user's mouse if they are grabbing it
	engine.setWhileObjectHeld(() => {
		engine.selectedObject.velocity.x = 0;
		engine.selectedObject.velocity.y = 0;

		engine.selectedObject.position.x = engine.mousePos.x;
		engine.selectedObject.position.y = engine.mousePos.y;
	});

	engine.start();
	console.log('engine started');

	const grabMeDelay = 5000; // How long to wait to show "GRAB ME" text if user hasn't thrown a ball
	const grabMeFlashTime = 500; // How fast to flash "GRAB ME" text
	setTimeout(() => {
		if (!userHasThrown) {
			grabMeIsActive = true;
			const grabMeInterval = setInterval(() => {
				if (grabMeIsActive) {
					showGrabMe = !showGrabMe;
				} else {
					showGrabMe = false;
					showThrowMe = false;
					clearInterval(grabMeInterval);
				}
			}, grabMeFlashTime);
		}
	}, grabMeDelay);

	return engine;
}
