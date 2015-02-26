var express = require('express');
var router = express.Router();

var User = require('../models').User;

var isExisted = function(data, list){
	for(var key in list){
		if(data[list[key]] == undefined || data[list[key]] === ''){
			return false;
		}
	}
	return true;
};

var isValidated = function(data, list){
	var valid = true;

	for(var key in list){
		var value = list[key];
		var finder = {};

		finder[value] = data[value];

		User.findOne(finder, function(err, user){

			if(user != null){
				valid = false;
			}
		});
	}

	console.log(valid);

	return valid;
};

router.get('/', function(req, res, next) {
	User.find().exec(function(err, users){
		res.send(users);
	});
});

router.post('/', function(req, res, next) {
	var list = ['id', 'pwd', 'email', 'nickname'];

	if(!isExisted(req.body, list)){
		res.send({
			result : false,
			msg : 'Wrong user Data'
		});
	}

	User.findOne({'id': req.body.id}, function(err, user_by_id){
		if(user_by_id == null){
			User.findOne({'nickname': req.body.nickname}, function(err, user){
				if(user == null){
					var user = new User({
						id: req.body.id, 
						pwd: req.body.pwd, 
						email: req.body.email, 
						nickname: req.body.nickname 
					});

					user.save();

					res.send({
						result: true,
						msg: 'success',
						test : 'test'
					});
				}else{
					res.send({
						result : false,
						msg : 'Already exist nickname'
					});
				}
			});
		}else{
			res.send({
				result : false,
				msg : 'Already exist id'
			});
		}
	});
});

router.post('/login',function(req,res,next){

	User.findOne({'id' : req.body.id}, function(err, user){
		if(user == null){
			res.send({
				result: false,
				msg: 'There is no user'
			});
		}else{
			var 	check = req.body.pwd === user.pwd;

			if(check){
				res.send({
					result: true,
					msg: 'success'
				});
			}else{
				res.send({
					result: false,
					msg: 'Wrong password'
				});
			}
		}
	});
});

module.exports = router;
