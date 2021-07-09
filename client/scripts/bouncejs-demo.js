import { Ball } from './bouncejs/Ball.js';
import { Engine } from './bouncejs/Engine.js';

let canvas;
let engine;

export function initBounceJSDemo() {
	canvas = document.querySelector('canvas');
	canvas.height = window.innerHeight / 2;
	canvas.width = (window.innerWidth * 2) / 3;

	engine = new Engine(canvas, '#121212');
	engine.start();

	let sliders = document.querySelectorAll('.slider, .ballSlider');
	sliders.forEach((slider) => {
		slider.onmousemove = updateSlider;
		slider.ontouchmove = updateSlider;
		//slider.onmousemove(); //Set value on page load
	});

	let toggleSwitch = document.querySelector('.toggle');
	toggleSwitch.onmousedown = toggle;
	toggleSwitch.ontouchmove = toggle;

	let addButton = document.querySelector('button');
	addButton.onclick = addBall;

	const onResize = () => {
		canvas.width = (window.innerWidth * 2) / 3;
		canvas.height = window.innerHeight / 2;
		engine.width = (window.innerWidth * 2) / 3;
		engine.height = window.innerHeight / 2;
	};
	window.addEventListener('resize', onResize);
	engine.onStop = () => {
		window.removeEventListener('resize', onResize);
	};

	return engine;
}

/**
 * Toggles a given toggle switch
 * @param {MouseEvent} mouseEvent
 */
function toggle(mouseEvent) {
	let toggleSwitch = mouseEvent.currentTarget;
	let slider = toggleSwitch.children[0];
	let label = toggleSwitch.parentElement.children[0];

	console.log(window.getComputedStyle(slider).width);
	if (window.getComputedStyle(slider).right == '0px') {
		let sliderContainerWidth = parseInt(
			window.getComputedStyle(toggleSwitch).width.split('px')[0]
		);
		let sliderWidth = parseInt(
			window.getComputedStyle(slider).width.split('px')[0]
		);
		let sliderMargin = parseInt(
			window.getComputedStyle(slider).marginRight.split('px')[0]
		);

		slider.style.right =
			sliderContainerWidth - (sliderWidth + sliderMargin * 2) + 'px';
		slider.parentNode.style.backgroundColor = 'gray';

		label.textContent = 'Collisions: OFF';

		engine.physObjects.forEach((ball) => {
			ball.collidesWithObjects = false;
		});
	} else {
		slider.style.right = '0px';
		slider.parentNode.style.backgroundColor = 'royalblue';

		label.textContent = 'Collisions: ON';

		engine.physObjects.forEach((ball) => {
			ball.collidesWithObjects = true;
		});
	}
}

/**
 * Updates the value from an html slider
 * @param {MouseEvent} mouseEvent
 */
function updateSlider(mouseEvent) {
	let slider = mouseEvent.currentTarget;
	let value = parseInt(slider.value);
	let label = slider.parentElement.children[0];
	let labelText = label.textContent.split(' ')[0];

	if (labelText == 'Drag:') {
		value = (value / 100).toFixed(2);
	}

	label.textContent = labelText + ' ' + value;

	if (labelText == 'Gravity:') {
		engine.physObjects.forEach((ball) => {
			ball.gravity = parseFloat(value);
		});
	} else if (labelText == 'Drag:') {
		engine.physObjects.forEach((ball) => {
			ball.drag = parseFloat(value);
		});
	}
}

function addBall() {
	console.log('add ball');
	const colorInput = document.querySelector('.colorInput');
	const sliders = document.querySelectorAll('.ballSlider');
	let ball = new Ball();

	let check = new Option().style;
	let color = colorInput.value.toLowerCase();
	check.color = color;

	if (color == '') {
		alert('Please enter a color. (red, blue, #000000, etc.)');
	} else if (check.color == color) {
		ball.color = color;
		console.log('default value: ', sliders[1].defaultValue);
		console.log('slider: ', sliders[0]);
		ball.radius = parseInt(sliders[0].value);
		ball.velocity.x = parseInt(sliders[1].value);
		ball.velocity.y = parseInt(sliders[2].value);
		ball.position.x = Math.random() * canvas.width;
		ball.position.y = Math.random() * canvas.height;

		engine.add(ball);

		console.log('ball added');
	} else {
		alert('"' + colorInput.value + '" is not a valid CSS color.');
	}
}
