const Login = require("../models/Login")
const Product = require("../models/Product")

// Post: Inserting product into database
exports.addProduct = (req, res) => {
    const userID = req.params.userID
    Login.findById({ _id: req.body.userID }).exec(function (err, user) {
        if (err) {
            console.log("Server Error" + err);
            res.status(500).json({ productStatus: "failure", err: err })
        } else {
            // console.log("Product: " + req.body);
            // console.log("User: " + user);
            let product = new Product(req.body)
            product.save((err, data) => {
                if (err) {
                    res.status(500).json({ productStatus: "failure", err: err })
                } else {
                    // res.status(200).json({ productStatus: "created", data: data })
                    // all products of specific userID
                    Product.find({ userID: data.userID }, (err, dataa) => {
                        if (err) {
                            res.status(500).json({ productStatus: 'failure', err: err })
                        } else {
                            // var query = { _id: data.userID }
                            //console.log(data.userID);
                            // Login.find(query)
                            //     .then(userr => {
                            // var updateProductList = { product: dataa }
                            // res.status(200).json({ 'todo_status': 'found', 'todos': userr });
                            Login.findByIdAndUpdate(data.userID, { $set: { product: dataa } }, { new: true }, (err, doc) => {
                                if (err) {
                                    res.status(500).json({ productStatus: 'failure', err: err })
                                } else {
                                    res.status(200).json({ productStatus: 'data', doc: doc })
                                }
                            })
                            // })
                        }
                    })
                }
            })
        }
    })
}

// Post: Fetching product from database
exports.getAllProduct = (req, res) => {
    Product.find({ userID: req.params.userID }, (err, product) => {
        if (err) {
            console.log("Error in database: ", err);
            res.status(500).json({ productStatus: 'failure', err: err })
        } else {
            console.log("Get all product: ", product);
            res.status(200).json({ productStatus: product })
        }
    })
}

// Delete all Product
exports.delAllProduct = (req, res) => {
    Product.deleteMany({}, (err, product) => {
        if (err) {
            res.status(500).send(err);
        } else {
            console.log("All products deleted");
            res.status(200).json(product);
        }
    })
}