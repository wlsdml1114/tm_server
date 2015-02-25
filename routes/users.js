var express = require('express');
var router = express.Router();

var User = require('../models').User;

router.get('/', function(req, res, next) {
	User.find().exec(function(err, users){
		res.send(users);
	});
});

router.post('/', function(req, res, next) {
	var user = new User({ id: req.body.id, pwd: req.body.pwd, email: req.body.email, nickname: req.body.email });
	// User.findOne({'id' : req.body.id},function(err,user){
	// 	if(typeof user === 'undefined'){
	// 		res.send(false);
	// 	}
	// 	else{
	// 		res.send(true);
	// 		user.save();
	// 	}
	// });
	user.save();
	res.send(true);
});

router.post('/login',function(req,res,next){
	var user = new User();

	User.findOne({'id' : req.body.id},function(err,user){

		var check = (req.body.pwd===user.pwd);	
		console.log(check);
		if(check){
			res.send(true);
		}
		else{
			res.send(false);
		}
	});
});

module.exports = router;
