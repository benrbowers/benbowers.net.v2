import { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default (req: VercelRequest, res: VercelResponse) => {
	console.log('req: ', req);
	console.log('res: ', res);

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'me@benbowers.net',
			pass: 'w:WJ[~zr_nX_0',
		},
	});

	const message = {
		from: 'me@benbowers.net',
		to: 'me@benbowers.net',
		subject: 'NextJS + Vercel + GMail test',
		text: 'This is the text body',
		html: '<p>This is the HTML body</p>',
	};

	transporter.sendMail(message, (err, info) => {
		if (err) {
			res.status(400).json(err);
		} else {
			res.status(200).json(info);
		}
	});
};
