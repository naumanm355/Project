const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LoginAccount = new Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  product: []
});

module.exports = mongoose.model("LoginAccount", LoginAccount);
