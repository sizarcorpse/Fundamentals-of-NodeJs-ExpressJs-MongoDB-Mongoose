//______require______
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

//______connection______
mongoose.connect("mongodb://localhost/nodeex");
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

//______Controllers______

//______Routers______
// Home
app.get("/", (req, res) => {
  let articles = [
    {
      id: 1,
      title: "Atricle One",
      author: "sizar Corpse",
      body:
        "he example above is actually a working server: Go ahead and click on the URL shown. You’ll get a response, with real-time logs on the page, and any changes you make will be reflected in real time. This is powered by RunKit,"
    },
    {
      id: 2,
      title: "Atricle two",
      author: "sizar Corpse",
      body:
        "First create a directory named myapp, change to it and run npm init. Then install express as a dependency, as per the installation guide."
    },
    {
      id: 3,
      title: "Atricle three",
      author: "aurora xayan",
      body:
        "This app starts a server and listens on port 3000 for connections. The app responds with Hello World! for requests to the root URL (/) or route. For every other path, it will respond with a 404 Not Found."
    },
    {
      id: 4,
      title: "Atricle four",
      author: "xeenin",
      body:
        "In the myapp directory, create a file named app.js and copy in the code from the example above."
    }
  ];
  res.render("index", {
    title: "articles",
    articles: articles
  });
});
// Add
app.get("/article/add", (req, res) => {
  res.render("add_article", {
    title: "Add Article"
  });
});
//______Start Server______

const port = 3000;
app.listen(port, () => console.log(`app listening on port ${port}!`));
