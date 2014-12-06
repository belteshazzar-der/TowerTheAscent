var mongoose = require('mongoose');
 
module.exports = mongoose.model('Post',{
    title: String,
    date: String,
    content: String,
    comments: [String],
});
