const Article = require("../_models/ArticleModel");
const { check, validationResult } = require("express-validator");
module.exports = {
  //get all article
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
  //get single article
  getSingleArticle: (req, res) => {
    Article.findById({ _id: req.params._id })
      .then(result => {
        res.render("article", {
          title: "Article",
          article: result
        });
      })
      .catch(err => {
        res.json({ success: false, result: err });
      });
  },
  //get single article update form
  singleArticleUpdate: (req, res) => {
    Article.findById({ _id: req.params._id })
      .then(result => {
        req.flash("success", "Article has been Updated");
        res.render("update_article", {
          title: "Update",
          article: result
        });
      })
      .catch(err => {
        res.json({ success: false, result: err });
      });
  },
  //create single article page
  addArticle: (req, res) => {
    res.render("add_article", {
      title: "Add Article"
    });
  },
  //create single article  form
  createArticle: (req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const body = req.body.body;
    // check("title")
    //   .isEmpty()
    //   .withMessage("The Last name is required");
    // check("author")
    //   .isEmpty()
    //   .withMessage("The Last name is required");
    // check("body")
    //   .isEmpty()
    //   .withMessage("The Last name is required");
    // const errors = validationResult(req);
    // if (errors) {
    //   res.render("add_article", {
    //     title: "add article",
    //     errors: errors
    //   });
    // } else {

    // }
    let createArticle = new Article({
      title: title,
      author: author,
      body: body
    });
    createArticle.save().then(result => {
      if (!result) {
        console.log(err);
      } else {
        req.flash("success", "Article has been Created");
        res.redirect("/");
      }
    });
  },
  //update single article  form
  addSingleArticleUpdate: (req, res) => {
    Article.update({ _id: req.params._id }, req.body).then(result => {
      if (!result) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  },
  //delete single artist
  singleArticleDelete: (req, res) => {
    Article.findByIdAndDelete({ _id: req.params._id }).then(result => {
      if (!result) {
        console.log(err);
      } else {
        res.send("Success");
      }
    });
  }
};
