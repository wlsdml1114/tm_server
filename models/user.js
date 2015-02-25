var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	id: String,
	pwd: String,
	email: String,
	nickname: String
});

module.exports = mongoose.model('User', userSchema);