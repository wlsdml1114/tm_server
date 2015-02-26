var express = require('express');
var router = express.Router();

var User = require('../models').User;

router.get('/', function(req, res, next) {
	User.find().exec(function(err, users){
		res.send(users);
	});
});

router.post('/', function(req, res, next) {
	var user = new User({ id: req.body.id, pwd: req.body.pwd, email: req.body.email, nickname: req.body.nickname });
	var check_id = new User();
	var check_nick = new User();
	User.findOne({'id' : req.body.id},function(err,check_id){
		if(check_id==null){
			User.findOne({'nickname' : user.nickname},function(err,check_nick){
				if(check_nick==null){					
					user.save();
					res.send({
						result: true,
						msg: 'success'
					});
				}
				else{
					res.send({
						result: false,
						msg: 'this nick is already using'
					});
				}
			});
		}
		else{
			res.send({
				result: false,
				msg: 'this Id is already using'
			});
		}
	});
	// user.save();
	// res.send(true);
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
