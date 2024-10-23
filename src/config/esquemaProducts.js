const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: Number,
    name: String,
    price: Number,
    descripction: String
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
