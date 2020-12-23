const express = require('express');
const Article = require('./../models/article');

const router = express.Router();

router.get('/', async (req, res) => {
	const articles = await Article.find().sort({ timestamp: 'desc' });
	res.render('articles/index', { articles: articles });
});

router.get('/create', (req, res) => {
	res.render('articles/create', { article: new Article() });
});

router.get('/edit/:id', async (req, res) => {
	try {
		const article = await Article.findById(req.params.id);
		if (article == null) res.redirect('/articles');
		res.render('articles/edit', { article: article });
	} catch (err) {
		console.log(err);
		res.redirect('/articles');
	}
});

router.get('/:id', async (req, res) => {
	try {
		const article = await Article.findById(req.params.id);
		if (article == null) res.redirect('/articles');
		console.log('This is the article');
		console.log(article);
		res.render('articles/read-more', { article: article });
	} catch (err) {
		console.log(err);
		res.redirect('/articles');
	}
});

router.put('/:id', async (req, res) => {
	const article = new Article({
		title: req.body.title,
		description: req.body.description,
		category: req.body.category,
		image: req.body.image,
		article: req.body.article,
		timestamp: new Date(),
	});

	try {
		const savedArticle = await article.save();
		res.redirect(`articles/${savedArticle.id}`);
	} catch (err) {
		res.redirect('articles/edit', { article: article });
		console.log(err);
	}
});

router.delete('/:id', async (req, res) => {
	await Article.findByIdAndDelete(req.params.id);
	res.redirect('articles');
});

router.post('/', async (req, res) => {
	const article = new Article({
		title: req.body.title,
		description: req.body.description,
		category: req.body.category,
		image: req.body.image,
		article: req.body.article,
		timestamp: new Date(),
	});

	try {
		const savedArticle = await article.save();
		res.redirect(`articles/${savedArticle.id}`);
	} catch (err) {
		res.redirect('articles/create', { article: article });
		console.log(err);
	}
});

module.exports = router;
