module.exports = {
	async rewrites() {
		return [
			{
                source: '/:path*',
                has: [
                    {
                        type: 'host',
                        value: 'fractal.benbowers.net',
                    },
                ],
                destination: '/public/FractalGeneratorDemo/:path*',
            },
		]
	},
}