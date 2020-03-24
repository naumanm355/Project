const Login = require("../models/Login")

// Account login
exports.signInAttempt = (req, res) => {
  Login.findOne({ email: req.body.email, password: req.body.password }, (err, account) => {
    if (err) {
      console.log("Server Error: ", err)
      res.status(500).json({ signInStatus: 'failure', err: err })
    }
    if (account != null || account != undefined) {
      console.log("Account Found");
      res.status(200).json({ signInStatus: 'authorized', name: account })
    } else {
      console.log("Account not found")
      res.status(404).json({ signInStatus: "not_authorized", err, err })
    }
  })
}

// Getting all accounts
exports.getAllAccounts = (req, res) => {
  Login.find({}, (err, account) => {
    if (err) {
      console.log("Error in Database: ", err);
      res.status(500).json({ Error: err });
    } else {
      console.log("Get all Account: ", account)
      res.status(200).json({ Account: account });
    }
  });
};

// Delete all product
exports.delAllAccount = (req, res) => {
  Login.deleteMany({}, (err, accounts) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log("All Accounts deleted");
      res.status(200).json(accounts);
    }
  })
}

//Posting data into database
exports.registerAccount = (req, res) => {
  console.log(req)
  console.log(req.body)
  // console.log(req.body.username)
  Login.findOne({ email: req.body.email }, (err, account) => {
    if (err) {
      console.log("Server Error: " + err)
      res.status(500).send({ registerStatus: "failure" })
    }
    if (account != null || account != undefined) {
      console.log("Account Found")
      res.status(302).json({ registerStatus: "found", })
    } else {
      console.log("Account not found. Creating account")
      let newAccount = new Login(req.body)
      newAccount.save((err, account) => {
        if (err) {
          console.log("Error in creating account: ", err)
          res.status(200).json({ registerStatus: "failure", err: err });
        } else {
          console.log("Account Created: ", account)
          res.status(201).json({ registerStatus: "created", err: account });
        }
      })
    }
  })
}