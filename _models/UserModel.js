const mongoose = require("mongoose");

// User Schema
const UserSchema = mongoose.Schema({
  forename: String,
  surname: String,

  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  password2: {
    type: String,
    required: true
  },

  age: Number,
  bio: String
});

const User = (module.exports = mongoose.model("User", UserSchema));
