var model = require('../models');

var connected_user = [];

/*
	1. sign in - > new user + new character (id) success
	2. login (character id) -> socket.connect -> socket.adduser - > connected_user
	3. connect_user log -> user.character (id, x, y)
*/

var run_socket = function(socket, io){

	socket.on('syncgame', function (data) {
		/*
			{x: a, y: a}
		*/
		socket.user.character.x =  data.x;
		socket.user.character.y =  data.y;

		connected_user[socket.user.id] = socket.user;

		var characters = [];

		for(var key in connected_user){
			characters.push({
				x : connected_user[key].character.x,
				y : connected_user[key].character.y,
				nickname : socket.user.nickname
			});
		}
		console.log(characters);

		io.sockets.emit('updategame', characters);
	});	

	socket.on('sendchat', function (data) {
		console.log(socket.user.id + " : " + data);
		io.sockets.emit('updatechat', socket.user.id, data);
	});

	socket.on('adduser', function(nickname){

		if(isValidateUser(nickname)){

			// var user = new model.User({
			// 	id : id,
			// 	character: new model.Character({ id : id })
			// });
			model.User.findOne({'nickname': nickname}, function(err, user){
				socket.user = user;
				connected_user.push(user);

				// console.log(connected_user);
				console.log(user);
				console.log('[SERVER CONNECT]' + user.nickname);
					
			});

			// socket.emit('updatechat', 'SERVER', 'you have connected');
			// socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');

			// io.sockets.emit('updateusers', usernames);
		}else{
			socket.emit('failadd', 'SERVER', false);
		}
	});

	socket.on('disconnect', function(){
		// connected_user.forEach(function(user, i){
		// 	if(user.id === id){
		// 		delete connected_user[i];
		// 	}
		// });

		// io.sockets.emit('updateusers', usernames);
		// socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
		delete connected_user;
	});
};

var isValidateUser = function(id){
	for(var user in connected_user){
		if(user.id === id){
			return false;
		}
	}

	return true;
};

module.exports = run_socket;