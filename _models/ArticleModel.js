const mongoose = require("mongoose");

//article Schema

const ArticleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  body: {
    type: String,
    require: true
  }
});

const Article = (module.exports = mongoose.model("Article", ArticleSchema));
