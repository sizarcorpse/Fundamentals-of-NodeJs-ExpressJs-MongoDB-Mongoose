const User = require("../_models/UserModel");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");
module.exports = {
  //create single article page
  userRegristrationForm: (req, res) => {
    res.render("register", {
      title: "New User"
    });
  },

  userRegristration: (req, res) => {
    const forename = req.body.forename;
    const surname = req.body.surname;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;
    const age = req.body.age;
    const bio = req.body.bio;

    check("forename", "forename is required").notEmpty();
    check("surname", "surname is required").notEmpty();
    check("bio", "bio is required").notEmpty();
    check("age", "age is required").notEmpty();
    check("username", "Username is required").notEmpty();
    check("email", "Email is required").notEmpty();
    check("email", "Email is not valid").isEmail();
    check("password", "Password is required").notEmpty();
    check("password2", "Passwords do not match").equals(req.body.password);

    const errors = validationResult(req);

    if (errors) {
      res.render("register", {
        errors: errors
      });
    } else {
      let userRegristrationX = new User({
        forename: forename,
        surname: surname,
        username: username,
        email: email,
        password: password,
        age: age,
        bio: bio
      });

      userRegristrationX.save(function(err) {
        if (err) {
          console.log(err);
          res.send(err);
          return;
        } else {
          req.flash("success", "You are now registered and can log in");
          res.redirect("/user/login");
        }
      });
      // bcrypt.genSalt(10, function(err, salt) {
      //   bcrypt.hash(newUser.password, salt, function(err, hash) {
      //     if (err) {
      //       console.log(err);
      //     }
      //     userRegristrationX.password = hash;
      //     userRegristrationX.save(function(err) {
      //       if (err) {
      //         console.log(err);
      //         res.send(err);
      //         return;
      //       } else {
      //         req.flash("success", "You are now registered and can log in");
      //         res.redirect("/user/login");
      //       }
      //     });
      //   });
      // });
    }
  },
  //create login page
  userLoginForm: (req, res) => {
    res.render("login", {
      title: "login"
    });
  }
};
