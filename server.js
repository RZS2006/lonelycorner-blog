// lonelyplanet-blog | server.js

// Dotenv
require('dotenv').config();

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

// Article Router
const articleRouter = require('./routes/articles');

const app = express();
const port = 5000;

const DB_URI = process.env.DB_URI;

// Connect to DB
mongoose
	.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('connected to database'))
	.catch(err => console.log(err));

// View Engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use('/articles', articleRouter);

// Routes
app.get('/', (req, res) => {
	res.redirect('/articles');
});

app.get('*', (req, res) => {
	res.redirect('/articles');
});

// Listen
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
