$(document).ready(function() {
	//#17 - Set Up the Environment:
	/*global io*/
	var socket = io();

	// Form submittion with new message in field with id 'm'
	$('form').submit(function() {
		var messageToSend = $('#m').val();

		//#22: Send and Display Chat Messages:
		socket.emit('chat message', messageToSend);

		$('#m').val('');
		return false; // prevent form submit from refreshing page
	});

	//#18 - Communicate by Emitting:
	// socket.on('user count', function(data) {
	// 	console.log(data);
	// });

	//#21: Announce New Users:
	socket.on('user', function(data) {
		$('#num-users').text(data.currentUsers + ' users online');
		var message = data.name;
		if (data.connected) {
			message += ' has joined the chat.';
		} else {
			message += ' has left the chat.';
		}
		$('#messages').append($('<li>').html('<b>' + message + '<\/b>'));
	});

	socket.on('chat message', function(data) {
		$('#messages').append($('<li>').text(data.name + ': ' + data.message));
	});

	// socket.on('disconnect', () => { /*anything you want to do on disconnect*/
	// 	console.log("User has disconnected");
	// });
});