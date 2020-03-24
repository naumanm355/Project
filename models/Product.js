const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "LoginAccount"
    },
    title: {
        type: String
    },
    category: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    creationDate: {
        type: String
    },
    description: {
        type: String
    }
})
module.exports = mongoose.model("ProductScheme", ProductSchema)