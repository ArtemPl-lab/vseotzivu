const {Schema, model} = require('mongoose');

const schema = new Schema({
    postId: {type: String, required: true},
    name: {type: String, required: true},
    content: {type: String, required: true},
    replays: { type: Array }
});

module.exports = model('Comment', schema);