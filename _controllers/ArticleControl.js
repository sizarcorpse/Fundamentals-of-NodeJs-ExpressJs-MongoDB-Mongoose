const Article = require("../_models/ArticleModel");

module.exports = {
  getArticles: (req, res) => {
    Article.find()
      .then(result => {
        res.render("index", {
          title: "Articles",
          articles: result
        });
      })
      .catch(err => {
        res.json({ success: false, result: err });
      });
  },

  addArticle: (req, res) => {
    res.render("add_article", {
      title: "Add Article"
    });
  },

  createArticle: (req, res) => {
    let createArticle = new Article({
      title: req.body.title,
      author: req.body.author,
      body: req.body.body
    });
    createArticle.save().then(result => {
      if (!result) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  }
};
