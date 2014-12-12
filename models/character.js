var mongoose = require('mongoose');
 
module.exports = mongoose.model('Character',{
    username: String,
    level: 32-bit integer,
	worldNum: 32-bit integer,
    locationNum: 32-bit integer,
	gold: 64-bit integer,
});