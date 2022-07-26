const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false}
},{timestamps: true}
);

//export to controllers
module.exports =mongoose.mongoose.model('User',UserSchema);