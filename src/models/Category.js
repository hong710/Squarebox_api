const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    slug: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    title: {type: String},
},{timestamps: true}
);

module.exports =mongoose.mongoose.model('Category',CategorySchema);