import { Engine } from './bouncejs/Engine.js';
import { Ball } from './bouncejs/Ball.js';

let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let engine = new Engine(
	canvas,
	getComputedStyle(document.body).backgroundColor
);

let ball = new Ball(75, 'green');
ball.velocity.x = 250;
ball.velocity.y = 100;

engine.add(ball);

engine.start();
