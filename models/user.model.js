const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  jobTytle: {
    type: String,
  },
  gender: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
