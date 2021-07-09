import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Engine } from '../../scripts/bouncejs/Engine';
import { initBounceJSDemo } from '../../scripts/bouncejs-demo.js';
import style from './bouncejs.module.css';

const BounceJSDemo = () => {
	const [hasLoaded, setHasLoaded] = useState(false);
	let engine = null as null | Engine; // The ball engine

	const router = useRouter();

	useEffect(() => {
		if (!hasLoaded) {
			// Start bouncy balls only if the page has not loaded before
			engine = initBounceJSDemo();
			setHasLoaded(true);
		}

		if (engine) {
			router.events.on('routeChangeStart', (url: string) => {
				if (url !== '/demos/bouncejs-demo') {
					// Stop engine if page is changed
					engine?.stop();
				}
			});
		}
	});
	return (
		<div style={{ backgroundColor: '#252526', overflowX: 'hidden' }}>
			<h1 className={style.title}>BounceJS</h1>
			<p className={style.description}>
				This library works by drawing circles on an HTML canvas element. The
				base unit for this engine is a pixel, e.g. velocity is in px/s. I put
				together this little physics sandbox so you can get a good idea of what
				the library is capable of. Have fun!
			</p>

			<div className={style.controls}>
				<div className={style.settings}>
					<h2 className={style.header}>Settings</h2>
					<div className={style.setting}>
						<p>Gravity: 0</p>
						<input
							className={style.slider + ' ' + 'slider'}
							type="range"
							min="0"
							max="500"
							defaultValue="0"
						/>
					</div>
					<div className={style.setting}>
						<p>Drag: 0.00</p>
						<input
							className={style.slider + ' ' + 'slider'}
							type="range"
							min="0"
							max="100"
							defaultValue="0"
						/>
					</div>
					<div className={style.setting}>
						<p>Collisions: ON</p>
						<div className={style.toggle + ' ' + 'toggle'}>
							<div className={style.switch}></div>
						</div>
					</div>
				</div>
				<div className={style.settings}>
					<h2 className={style.header}>Ball Creator</h2>
					<div className={style.setting}>
						<p>Color:</p>
						<input
							className={style.colorInput + ' ' + 'colorInput'}
							type="text"
							placeholder="CSS Color"
						/>
					</div>
					<div className={style.setting}>
						<p>Radius: 50</p>
						<input
							className={style.slider + ' ' + 'ballSlider'}
							type="range"
							min="25"
							max="100"
							defaultValue="50"
						/>
					</div>
					<div className={style.setting}>
						<p>X-Velocity: 100</p>
						<input
							className={style.slider + ' ' + 'ballSlider'}
							type="range"
							min="-200"
							max="200"
							defaultValue="100"
						/>
					</div>
					<div className={style.setting}>
						<p>Y-Velocity: 100</p>
						<input
							className={style.slider + ' ' + 'ballSlider'}
							type="range"
							min="-200"
							max="200"
							defaultValue="100"
						/>
					</div>
					<div className={style.button}>
						<button>Add Ball</button>
					</div>
				</div>
			</div>
			<canvas className={style.physicsCanvas}></canvas>
		</div>
	);
};

export default BounceJSDemo;
