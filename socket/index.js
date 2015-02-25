var model = require('../models');

var usernames = {};

var run_socket = function(socket, io){

	socket.on('sendchat', function (data) {
		console.log(socket.username + " : " + data);
		io.sockets.emit('updatechat', socket.username, data);
	});

	socket.on('adduser', function(username){

		console.log('adduser');

		var user = new model.User({
			id : username
		});

		if(usernames[username]!=null){
	
			socket.emit('failadd', 'SERVER', false);
	
		}else{
			user.save();

			socket.username = username;
			usernames[username] = username;

			console.log('[SERVER CONNECT]' + username);
			// socket.emit('updatechat', 'SERVER', 'you have connected');
			// socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');

			// io.sockets.emit('updateusers', usernames);
		}
	});

	socket.on('disconnect', function(){

		delete usernames[socket.username];

		// io.sockets.emit('updateusers', usernames);
		// socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');

	});
};

module.exports = run_socket;