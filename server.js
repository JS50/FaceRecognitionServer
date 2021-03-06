const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('hello');
});

app.post('/signin', (req, res) => {signin.handlesignin ( req, res, db, bcrypt)});
app.post('/register', (req, res) => { register.handleregister ( req, res, db, bcrypt )});
app.get('/profile/:id', (req, res) => { profile.handleprofile (req, res, db)});
app.put('/image', (req, res) => { image.imagehandler (req, res, db)});
app.post('/imageURL', (req, res) => { image.handleAPIcall (req, res)});



app.listen(process.env.PORT || 3000, () => {
	console.log(`app is runnin on port ${process.env.PORT}`);
})