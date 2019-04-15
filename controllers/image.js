const Clarifai = require('clarifai');

 const app = new Clarifai.App({
 apiKey: process.env.Clarifai_key
});

const handleAPIcall = (req, res) => {
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to communicate with API'))
}

const imagehandler = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('Could not get entries'))
}

module.exports = {
	imagehandler,
	handleAPIcall
}