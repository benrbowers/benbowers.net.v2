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

	const linkBallImgs = ['GitHub-Mark-Light-120px-plus.png', 'In-White-128.png'];
	const linkBalls = [];

	let initNetMomentum = 0;

	let a = window.innerHeight * window.innerWidth; // Area of window in pixels^2
	const bgBallPcnt = 4; // Percentage of screen area ball will take up

	// Generate balls that navigate to socials, add them to the engine, and put them into the `linkBalls` array
	for (let i = 0; i < linkBallImgs.length; i++) {
		const linkBall = new Ball();
		linkBall.color = chakraColors[colorTheme][600];
		linkBall.radius = Math.sqrt((bgBallPcnt * a) / (100 * Math.PI));
		linkBall.mass = (4 / 3) * Math.PI * linkBall.radius ** 3;
		linkBall.position.x = Math.random() * window.innerWidth;
		linkBall.position.y = Math.random() * window.innerHeight;
		linkBall.velocity.x = Math.random() * -200 + 100;
		linkBall.velocity.y = Math.random() * -200 + 100;

		linkBalls[i] = linkBall;
		engine.add(linkBall);

		initNetMomentum += linkBall.mass * linkBall.velocity.magnitude;
	}

	const smBallPcnt = 2; // Percentage of screen area ball will take up
	const numThrowBalls = 9; // Number of throw balls to add to screen
	const throwBalls = [];

	// Generate balls for grabbing/throwing, add them to the engine, and put them in the `throwBalls` array
	for (let i = 0; i < numThrowBalls; i++) {
		const shades = [200, 300, 400];
		const throwBall = new Ball();
		throwBall.color = chakraColors[colorTheme][shades[i % 3]]; // Alternate between light and dark
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

	//Create the ball that will show "GRAB ME" and then "THROW ME" if user doesn't throw a
	/** @type HTMLDivElement */
	const grabMeText = document.querySelector('.grabMeText');

	const grabMeBall = new Ball();
	grabMeBall.color = chakraColors[colorTheme][400];
	grabMeBall.radius = grabMeText.offsetWidth / Math.SQRT2;
	grabMeBall.mass = (4 / 3) * Math.PI * grabMeBall.radius ** 3;
	grabMeBall.position.x = Math.random() * window.innerWidth;
	grabMeBall.position.y = Math.random() * window.innerHeight;
	grabMeBall.velocity.x = Math.random() * -350 + 175;
	grabMeBall.velocity.y = Math.random() * -350 + 175;
	engine.add(grabMeBall);
	initNetMomentum += grabMeBall.mass * grabMeBall.velocity.magnitude;

	// Ball with title text
	/** @type HTMLDivElement */
	const titleText = document.querySelector('.title');

	const titleBall = new Ball();
	titleBall.color = chakraColors[colorTheme][600];
	titleBall.radius = titleText.offsetWidth / Math.SQRT2;
	titleBall.mass = (4 / 3) * Math.PI * titleBall.radius ** 3;
	titleBall.position.x = Math.random() * (window.innerWidth / 3);
	titleBall.position.y = Math.random() * (window.innerHeight / 3);
	engine.add(titleBall);

	//Create the ball that will show "GRAB ME" and then "THROW ME" if user doesn't throw a
	/** @type HTMLDivElement */
	const subtitleText = document.querySelector('.subtitle');

	const subtitleBall = new Ball();
	subtitleBall.color = chakraColors[colorTheme][600];
	subtitleBall.radius = subtitleText.offsetWidth / Math.SQRT2;
	subtitleBall.mass = (4 / 3) * Math.PI * subtitleBall.radius ** 3;
	subtitleBall.position.x = (2 + Math.random()) * (window.innerWidth / 3);
	subtitleBall.position.y = (2 + Math.random()) * (window.innerHeight / 3);
	engine.add(subtitleBall);

	/** @type {HTMLDivElement} */
	const navBar = document.querySelector('.navBar');
	const navRect = navBar.getBoundingClientRect();

	const navBallRadius = navBar.clientHeight / 3;
	let currPos = navBallRadius * 1.5;
	/** @type {Ball[]} */
	const navBalls = [];

	// String of static balls that "protects" the nav bar
	while (currPos < navBar.clientWidth - navBallRadius) {
		const navBall = new Ball();
		navBall.collidesWithWalls = false;
		navBall.mass = 1;
		navBall.isStatic = true;
		navBall.position.x = navRect.x + currPos;
		navBall.position.y = navRect.y + navBar.clientHeight / 2;
		console.log(navBall.position);
		navBall.radius = navBallRadius;
		navBall.color = 'transparent';
		engine.add(navBall);
		navBalls.push(navBall);

		currPos += navBallRadius;
	}

	// Add click event listeners to the color option button to change the color of each ball
	document.querySelectorAll('.colorOption').forEach((option) => {
		option.addEventListener('click', (e) => {
			const shades = [200, 300, 400];

			const value = e.currentTarget.value;
			const newColor = chakraColors[value];

			linkBalls.forEach((ball) => {
				ball.color = newColor[600];
			});

			throwBalls.forEach((ball, i) => {
				ball.color = newColor[shades[i % 3]];
			});

			titleBall.color = newColor[600];
			subtitleBall.color = newColor[600];

			grabMeBall.color = newColor[400];
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

	document.querySelector('.settingsAway').addEventListener('click', () => {
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

		linkBalls.forEach((linkBall) => {
			linkBall.radius = Math.sqrt((bgBallPcnt * a) / (100 * Math.PI));
		});

		throwBalls.forEach((throwBall, i) => {
			throwBall.radius =
				Math.sqrt((smBallPcnt * a) / (100 * Math.PI)) / 2 +
				(Math.sqrt((smBallPcnt * a) / (100 * Math.PI)) / 2) *
					((i + 1) / numThrowBalls);
		});

		grabMeBall.radius = grabMeText.offsetWidth / Math.SQRT2;
		titleBall.radius = titleText.offsetWidth / Math.SQRT2;
		subtitleBall.radius = subtitleText.offsetWidth / Math.SQRT2;

		const newNavRect = navBar.getBoundingClientRect();
		navBalls.forEach((navBall, i) => {
			navBall.radius = navBar.clientHeight / 3;
			navBall.position.x =
				newNavRect.x +
				(navBar.clientWidth - navBall.radius) * ((i + 1) / navBalls.length);
			navBall.position.y = newNavRect.y + navBar.clientHeight / 2;
		});
	};
	window.addEventListener('resize', onResize);
	engine.onStop = () => {
		window.removeEventListener('resize', onResize);
	};

	let grabMeIsActive = false; // Whether `grabMeBall` needs to display text
	let showThrowMe = false; // Whether to show the "THROW ME" text image

	let dragIsActive = false; // Whether drag is currently applied

	engine.setOnFrame(() => {
		// Add images to the linkBalls every frame
		for (let i = 0; i < linkBallImgs.length; i++) {
			const offset = (linkBalls[i].radius / Math.sqrt(2)) * (1 - i * 0.15); // Offset to fit square image in a circle
			const x = linkBalls[i].position.x - offset; // x coord for image
			const y = linkBalls[i].position.y - offset; // y coord for image
			const img = document.createElement('img');
			img.src = '/images/ballLogos/' + linkBallImgs[i];
			const canvas2D = canvas.getContext('2d');
			canvas2D.drawImage(img, x, y, offset * 2, offset * 2);
		}

		// Add "GRAB ME" or "THROW ME" images to `grabMeBall` according to `showGrabMe` and `showThrowMe`
		if (grabMeIsActive) {
			const x = grabMeBall.position.x - grabMeBall.radius / Math.SQRT2;
			const y = grabMeBall.position.y - grabMeBall.radius / Math.SQRT2;

			grabMeText.style.transform = `translateX(${x}px) translateY(${y}px)`;
		}

		{
			const x = titleBall.position.x - titleBall.radius / Math.SQRT2;
			const y = titleBall.position.y - titleBall.radius / Math.SQRT2;

			titleText.style.transform = `translateX(${x}px) translateY(${y}px)`;
		}

		{
			const x = subtitleBall.position.x - subtitleBall.radius / Math.SQRT2;
			const y = subtitleBall.position.y - subtitleBall.radius / Math.SQRT2;

			subtitleText.style.transform = `translateX(${x}px) translateY(${y}px)`;
		}

		// Set mouse cursor based on which ball user is hovering or grabbing
		document.body.style.cursor = 'default';
		engine.physObjects.forEach((ball) => {
			if (
				ball.position.distance(engine.mousePos) < ball.radius &&
				!(settingsActive && engine.mousePos.x < 300)
			) {
				if (linkBalls.includes(ball)) {
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

		if (currentNetMomentum > initNetMomentum && !dragIsActive) {
			engine.physObjects.forEach((ball) => {
				ball.drag = 0.3;
			});
			dragIsActive = true;
		} else if (dragIsActive) {
			engine.physObjects.forEach((ball) => {
				ball.drag = 0.0;
			});
			dragIsActive = false;
		}
	});

	engine.setOnObjectPress(() => {
		if (!(settingsActive && engine.mousePos.x < 300)) {
			if (engine.selectedObject === linkBalls[0]) {
				window.open('https://github.com/benrbowers', '_blank');
				engine.selectedObject = null;
			} else if (engine.selectedObject === linkBalls[1]) {
				window.open(
					'https://www.linkedin.com/in/ben-bowers-07154417a/',
					'_blank'
				);
				engine.selectedObject = null;
			} else if (grabMeIsActive && engine.selectedObject === grabMeBall) {
				showThrowMe = true;
				grabMeText.innerText = 'THROW ME';
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

	const grabMeDelay = 15000; // How long to wait to show "GRAB ME" text if user hasn't thrown a ball
	const grabMeFlashTime = 500; // How fast to flash "GRAB ME" text
	setTimeout(() => {
		if (!userHasThrown) {
			grabMeIsActive = true;
			const grabMeInterval = setInterval(() => {
				if (grabMeIsActive) {
					if (showThrowMe) {
						grabMeText.innerText = 'THROW ME';
					} else if (grabMeText.innerText === '') {
						grabMeText.innerText = 'GRAB ME';
					} else {
						grabMeText.innerText = '';
					}
				} else {
					grabMeText.innerText = '';
					clearInterval(grabMeInterval);
				}
			}, grabMeFlashTime);
		}
	}, grabMeDelay);

	return engine;
}
