const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
//stats
var numUsers = 0;
var idRoom = 1;
var idUser = 1;

var users = [];
//[{
//          'id" : 1
//          'username' : 'michel',
//          'room_creator' : [1, 2],
//          }
//}]
var rooms = [];
//[{
//     'id': 1,
//    'name': 'hello',
//    'numUsers': 1,
//     'users' : [1, 2, 3, 4]
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
        socket.user_id = idUser;
        users.push({
            id: idUser,
            username: username,
            rooms_creator: []
        });
        idUser++;
        numUsers++;
        addedUser = true;
        socket.emit('login', {
            user_id: socket.user_id,
            users,
            rooms
        });
        io.sockets.emit('update users', users);//emit to all people

    });

    socket.on('add room', function(room) {
        let data = {
            id: idRoom,
            name:room,
            numUsers: 0
        };

        rooms.push(data);
        io.sockets.emit('update rooms', rooms);//emit to all people
        socket.emit('go room', data);//emit only to client
        messages[idRoom] = [];
        idRoom++;
    });

    socket.on('join room', function (room) {
        socket.join(room.id);
        let message = {
            'user_id':0,
            'message': users.find(x => x.id === socket.user_id).username + ' join the room ' + room.name
        };
        socket.broadcast.in(room.id).emit('new message', message);
        messages[room.id].push(message);
        socket.emit('get messages', {
            messages: messages[room.id]
        });
        rooms.find(x => x.id === room.id).numUsers++;
        io.sockets.emit('update rooms', rooms);//emit to all people
    });

    socket.on('leave room', function (room) {
        socket.leave(room.id);
        let message =  {
            'user_id':0,
            'username':'server',
            'message': users.find(x => x.id === socket.user_id).username + ' leave the room ' + room.name
        };
        socket.broadcast.in(room.id).emit('new message', message);
        messages[room.id].push(message);
        rooms.find(x => x.id === room.id).numUsers--;
        io.sockets.emit('update room', rooms);//emit to all people
    });

    socket.on('send message', function(data) {
        let message =  {
            'user_id': socket.user_id,
            'username': users.find(x => x.id === socket.user_id).username,
            'message': data.message
        };
        messages[data.room.id].push(message);
        socket.nsp.to(data.room.id).emit('new message', message);
    });


    // when the user disconnects.. perform this
    socket.on('disconnect', function (user_id) {
        if (addedUser) {
            numUsers--;

            io.sockets.emit('update users', users);//emit to all people

            // echo globally that this client has left
           /* socket.broadcast.emit('user left', {
                username: users[socket.user_id],
                numUsers: numUsers
            });*/
        }
    });
});


http.listen(3000, function(){
    console.log('listening on *:3000');
});