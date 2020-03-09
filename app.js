//______require______
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

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
//set public folder
app.use(express.static(path.join(__dirname, "public")));

//______Controllers______

const ArticleControl = require("./_controllers/ArticleControl");

//______Routes______

app.get("/", ArticleControl.getArticles);
app.get("/article/add", ArticleControl.addArticle);
app.post("/article/add", ArticleControl.createArticle);

//______Start Server______

const port = 3000;
app.listen(port, () => console.log(`app listening on port ${port}!`));
