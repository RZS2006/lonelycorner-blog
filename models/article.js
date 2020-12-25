// lonelyplanet-blog | models/article.js

const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	category: {
		type: String,
	},
	image: {
		type: String,
	},
	article: {
		type: String,
		required: true,
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
	edited: {
		type: Boolean,
		required: true,
	},
	lastEdited: {
		type: Date,
	},
});

module.exports = mongoose.model('Article', articleSchema);
