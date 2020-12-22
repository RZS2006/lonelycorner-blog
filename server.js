// lonelyplanet-blog | server.js

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const articleRouter = require('./routes/articles');

const app = express();
const port = 5000;

const DB_URI = process.env.DB_URI;
mongoose
	.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('connected to database'))
	.catch(err => console.log(err));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/articles', articleRouter);

app.get('/', (req, res) => {
	res.redirect('/articles');
});

app.get('*', (req, res) => {
	res.redirect('/articles');
});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
