import { VercelRequest, VercelResponse } from '@vercel/node';
import Mail from '@sendgrid/mail';

export default (req: VercelRequest, res: VercelResponse) => {
	Mail.setApiKey(process.env.SENDGRID_API_KEY as string);

	const msg = {
		to: 'me@benbowers.net', // Change to yo
		from: 'mail-bot@benbowers.net',
		subject: 'Message from ' + req.body.email,
		text: req.body.message,
	};

	Mail.send(msg)
		.then(() => {
			res.status(200).send(req.body);
		})
		.catch((error) => {
			res.status(400).json(error);
		});
};
