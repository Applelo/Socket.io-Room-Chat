const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
//stats
var numUsers = 0;
var idRoom = 1;
var idUser = 1;

var users = [];
//{
//    1: [{
//          'username' : 'michel',
//          }]
//}]
var rooms = [];
//[{
//     'id': 1,
//    'name': 'hello',
//    'numUsers': 1
//}]
var messages = {};
//{
//    '1': [{
//          'message' : 'hello',
//          'user_id' : 1, //if 0 is server send message type
//          }]
//}]

app.get('/', function(req, res){
    res.send('<p></p>');
});

io.on('connection', function (socket) {
    var addedUser = false;

    // when the client emits 'add user', this listens and executes
    socket.on('add user', function (username) {
        console.log('connection ' + username);
        if (addedUser) return;

        // we store the username in the socket session for this client
        socket.username = username;
        users[idUser] = {
            username
        };
        idUser++;
        numUsers++;
        addedUser = true;
        socket.emit('login', {
            username: socket.username,
            numUsers,
            rooms
        });

    });

    socket.on('add room', function(room) {
        let data = {
            id: idRoom,
            name:room,
            numUsers: 1
        };

        rooms.push(data);
        io.sockets.emit('new room', rooms);//emit to all people
        socket.emit('go room', data);//emit only to client
        idRoom++;
    });

    socket.on('join room', function (room, room_index, username) {
        socket.join(room.id);
        io.to(room.id).emit('new message',
            {
                'user_id':0,
                'message': username + ' join the room ' + room.name
            }
        );
        rooms[room_index].numUsers++;
    });

    socket.on('leave room', function (room, room_index, username) {
        socket.leave(room.id);
        io.to(room.id).emit('new message',
            {
                'user_id':0,
                'message': username + ' leave the room ' + room.name
            }
        );
        rooms[room_index].numUsers--;
    });


    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
        if (addedUser) {
            numUsers--;

            // echo globally that this client has left
            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
    });
});


http.listen(3000, function(){
    console.log('listening on *:3000');
});