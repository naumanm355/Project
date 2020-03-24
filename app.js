// Establish Database connection
var config = require("./config/db");

const express = require("express");
const bodyParser = require("body-parser");
var port = process.env.PORT || 3000;
// initialize our express app
const app = express();
// Body Parser is an npm package that is used to parse the incoming request bodies in a middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import controllers
const LoginController = require("./controllers/LoginController");
const ProductController = require("./controllers/ProductController")

// Creating End points
//User
app
  .route("/api/Accounts/getAllAccounts")
  .get(LoginController.getAllAccounts)

app
  .route("/api/Accounts/Register")
  .post(LoginController.registerAccount)

app
  .route("/api/Accounts/SignIn")
  .post(LoginController.signInAttempt)

app
  .route("/api/Accounts/dalAllAccount")
  .get(LoginController.delAllAccount)

//Product
app
  .route("/api/Accounts/addProduct/:userID")
  .post(ProductController.addProduct)

app
  .route("/api/Accounts/getAllProduct/:userID")
  .get(ProductController.getAllProduct)

app
  .route("/api/Accounts/delAllProduct")
  .get(ProductController.delAllProduct)

// const login = require("./models/login");
// http://localhost:3000/login
// app.post("/login", (req, res) => {
//   let newAccount = new login(req.body);
//   newAccount.save((err, account) => {
//     if (err) {
//       console.log("Error while creating the account", err);
//       res.status(200).json({ err: err });
//     } else {
//       res.status(200).json({ err: account });
//     }
//   });
// });
// http://localhost:3000
// http: app.get("/", (req, res) => {
//   login.find({}, (err, account) => {
//     if (err) {
//       console.log("Error in database: ", err);
//     } else {
//       res.status(200).json({ Account: account });
//     }
//   });
// });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
