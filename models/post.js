var mongoose = require('mongoose');
 
module.exports = mongoose.model('Post',{
	id:Number,
    title: String,
    date: String,
    content: String,
    comments: [String],
});
