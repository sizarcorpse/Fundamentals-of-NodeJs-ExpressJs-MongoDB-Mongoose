//______require______
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");

//______connection______

mongoose.connect("mongodb://localhost/nodeex", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

//check conncetion error
db.once("open", () => {
  console.log("Connected to MongoDB");
});

//heck for database error
db.on("error", err => {
  console.log(err);
});

//______init______

const app = express();

//______view engine______

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//______Database______

//______Middleware______

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//season
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);
//messase
app.use(require("connect-flash")());
app.use(function(req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});
//exress validator
const { check, validationResult } = require("express-validator");
// app.use(
//   expressValidator({
//     errorFormatter: function(param, msg, value) {
//       var namespace = param.split("."),
//         root = namespace.shift(),
//         formParam = root;
//       while (namespace.length) {
//         formParam += "[" + namespace.shift() + "]";
//       }
//       return {
//         param: formParam,
//         msg: msg,
//         value: value
//       };
//     }
//   })
// );

//set public folder
app.use(express.static(path.join(__dirname, "public")));

//______Controllers______

const ArticleControl = require("./_controllers/ArticleControl");

//______Routes______

app.get("/", ArticleControl.getArticles);
app.get("/article/add", ArticleControl.addArticle);
app.post("/article/add", ArticleControl.createArticle);
app.get("/article/:_id", ArticleControl.getSingleArticle);
app.get("/article/update/:_id", ArticleControl.singleArticleUpdate);
app.post("/article/update/:_id", ArticleControl.addSingleArticleUpdate);
app.delete("/article/delete/:_id", ArticleControl.singleArticleDelete);

//______Start Server______

const port = 3000;
app.listen(port, () => console.log(`app listening on port ${port}!`));
