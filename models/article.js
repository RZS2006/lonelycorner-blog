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
});

module.exports = mongoose.model('Article', articleSchema);
