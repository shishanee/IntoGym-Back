const Article = require("../models/Article.model")

module.exports.articleController = {
    createArticle: async(req, res) => {
        const data = await Article.create({
            image: req.body.image,
            title: req.body.title,
            ingo: req.body.info,
            data: req.body.data   
        });
        res.json(data)
    },
    getAllArticle: async(req, res) => {
        const data = await Article.find();
        res.json(data)
    },
    getOneArticle: async(req, res) => {
        const data = await Article.findById(req.params.id);
        res.json(data)
    }
}