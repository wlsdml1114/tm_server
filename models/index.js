var mongoose = require('mongoose');

var model_character = {
	id : String,
	x : Number,
	y : Number
};

var model_user = {
	id: String,
	pwd: String,
	email: String,
	nickname: String,
	character: model_character
};

var schema_user = mongoose.Schema(model_user);
var schema_character = mongoose.Schema(model_character);

module.exports = {
	User: mongoose.model('User', schema_user),
	Character: mongoose.model('Character', schema_character)
};