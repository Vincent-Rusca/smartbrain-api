const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'test',
    database: 'smart-brain'
  }
});
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => { res.send(database.users); });
app.post('/signin', (req, res) => { signin.handleSignIn(req, res, knex, bcrypt) });
app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt) });
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res) });
app.put('/image', (req, res) => { image.handleImage(req, res, knex) });
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });

app.listen(3001, () => {
  console.log('app is running on port 3001')
});
