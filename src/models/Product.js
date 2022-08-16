const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    images: {type: Array, required: true},
    o_price: {type: Number},
    c_price: {type: Number, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    quantity: {type: Number, required: true},
    specs: {type: Array, required: true},
},{timestamps: true}
);

module.exports =mongoose.mongoose.model('Product',ProductSchema);