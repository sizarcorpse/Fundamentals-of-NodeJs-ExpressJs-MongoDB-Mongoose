const mongoose = require("mongoose");

//article Schema

const articleSchema = mongoose.Schema({
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

const Article = (module.exports = mongoose.model("Article", articleSchema));
