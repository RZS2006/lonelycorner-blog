// lonelyplanet-blog | server.js

const express = require('express');
const articleRouter = require('./routes/articles');

const app = express();
const port = 5000;

app.set('view engine', 'ejs');

app.use('/articles', articleRouter);
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
	res.redirect('/articles');
});

app.get('*', (req, res) => {
	res.redirect('/articles');
});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
