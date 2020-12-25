// lonelyplanet-blog | routes/articles.js

// Dependencies
const express = require('express');
const mongoose = require('mongoose');

// Models
const Article = require('./../models/article');

const router = express.Router();

// Routes
router.get('/', async (req, res) => {
	const articles = await Article.find().sort({ timestamp: 'desc' });
	res.render('articles/index', { articles: articles });
});

router.get('/create', (req, res) => {
	res.render('articles/create', { article: new Article() });
});

router.get('/edit/:id', async (req, res) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			res.redirect('/articles');
		} else {
			const article = await Article.findById(req.params.id);
			if (article == null) res.redirect('/articles');
			res.render('articles/edit', { article: article });
		}
	} catch (err) {
		console.log(err);
		res.redirect('/articles');
	}
});

router.get('/:id', async (req, res) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			res.redirect('/articles');
		} else {
			const article = await Article.findById(req.params.id);
			if (article == null) res.redirect('/articles');
			res.render('articles/read-more', { article: article });
		}
	} catch (err) {
		console.log(err);
		res.redirect('/articles');
	}
});

router.put('/:id', async (req, res) => {
	let article = await Article.findById(req.params.id);

	article.title = req.body.title;
	article.description = req.body.description;
	article.category = req.body.category;
	article.image = req.body.image;
	article.article = req.body.article;
	article.edited = true;
	article.lastEdited = new Date();

	try {
		await article.save();
		res.redirect(`articles/${article.id}`);
	} catch (err) {
		res.redirect('articles/edit', { article: article });
		console.log(err);
	}
});

router.post('/', async (req, res) => {
	const article = new Article({
		title: req.body.title,
		description: req.body.description,
		category: req.body.category,
		image: req.body.image,
		article: req.body.article,
		timestamp: new Date(),
		edited: false,
	});

	try {
		const savedArticle = await article.save();
		res.redirect(`articles/${savedArticle.id}`);
	} catch (err) {
		res.redirect('articles/create', { article: article });
		console.log(err);
	}
});

router.delete('/:id', async (req, res) => {
	await Article.findByIdAndDelete(req.params.id);
	res.redirect('articles');
});

module.exports = router;
