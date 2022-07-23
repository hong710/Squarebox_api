const mongoose = require('mongoose');

//one order can have many order items- one to many relationships
const OrderSchema = new mongoose.Schema({
    userId: {type: String, required: true, unique: true},
    products: [
        {
            productId:{type: String},
            quantity: {type: Number, default:1},
        }
    ],
    amount: {type: Number, required: true},
    address: {type: Object, required: true},
    status: {type: String, required: true, default: 'pending'},
},{timestamps: true}
);

module.exports =mongoose.mongoose.model('Order',OrderSchema);