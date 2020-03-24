// Set up mongoose connection
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/").then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error is: ", err);
  }
);
