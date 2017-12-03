var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var collectionSchema = new Schema({
    username: String,
    urls: [String],
    name: String,
    description: String,
    visibility: String,
    rating: {type: Number, min: 0, max: 10}
});
module.exports = mongoose.model('collections', collectionSchema);