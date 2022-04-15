module.exports = {
	async rewrites() {
		return {
			beforeFiles: [
				{
					source: '/',
					has: [
						{
							type: 'host',
							value: 'fractal.benbowers.net',
						},
					],
					destination: '/public/FractalGeneratorDemo/index.html',
				},
			]
		}
	},
}