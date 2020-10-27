const {Schema, model} = require('mongoose');

const schema = new Schema({
    url: {type: String, required: true, unique: true},
    title: {type: String, required: true},
    content: {type: String, required: true, unique: true},
    organisation: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    site: {type: String, required: true},
    tags: {type: String, required: true},
    category: {type: String, required: true}
});

module.exports = model('Post', schema);