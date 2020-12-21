const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	const articles = [
		{
			title: 'Titile 1',
			description: 'Desc 1',
            timestamp: new Date(),
            category: "Cooking",
			image:
				'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg',
		},
        {   title: 'Titile 2', 
            description: 'Desc 2', 
            timestamp: new Date(), 
            category: "Tree",
            image: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" 
        }
	];
	res.render('articles/index', { articles: articles });
});

router.post("/", (req, res) => {
    // const newarticle = {
    //     title: req.body.title,
    //     description: req.body.description,
    //     category: req.body.category,
    //     image: req.body.image-url,
    //     timestamp: new Date()
    // }
    // articles.push(newarticle)
})

router.get("/create", (req, res) => {
    res.render("articles/create");
})

module.exports = router;
