const io = require('socket.io')(3000);
//stats
let numUsers = 0;
let idRoom = 2;
let idUser = 1;

let users = [];
/*[{
          "id" : 1
          "username" : "michel",
          "myRooms" : [1, 2, 3, 4]

}]*/
let rooms = [{
    'id':1,
    'name':'test',
    'numUsers':0,
    'users':[]
}];
/*[{
    "id": 1,
    "name": "hello",
   "numUsers": 1,
    "users" : [1, 2, 3, 4],
}]*/
let messages = {'1':[]};
/*{
    "1": [{
         "message" : "hello",
         "user_id" : 1, //if 0 is server send message type
          }]
}*/


io.on('connection', socket => {

    socket.on('add user', username => {
        console.log('connection ' + username);

        socket.user_id = idUser;
        users.push({
            id: idUser,
            username: username,
            myRooms: []
        });
        idUser++;
        numUsers++;

        io.sockets.emit('update users', users);//emit to all people
        socket.emit('update rooms', rooms);//emit only for client
        socket.emit('login', socket.user_id);
    });

    socket.on('add room', roomName => {
        let room = {
            id: idRoom,
            name:roomName,
            numUsers: 0,
            users: []
        };

        rooms.push(room);
        io.sockets.emit('update rooms', rooms);//emit to all people

        messages[idRoom] = [];
        idRoom++;

        socket.emit('room created', room);//emit only to client
    });

    socket.on('connect room', room => {
        socket.join(room.id);
        let message = {
            'user_id':0,
            'message': users.find(x => x.id === socket.user_id).username + ' join the room ' + room.name
        };
        socket.broadcast.in(room.id).emit('new message', message);
        messages[room.id].push(message);

        rooms.find(x => x.id === room.id).users.push(socket.user_id);
        rooms.find(x => x.id === room.id).numUsers++;
        io.sockets.emit('update rooms', rooms);//emit to all people

        users.find(x => x.id === socket.user_id).myRooms.push(room.id);
        io.sockets.emit('update users', users);//emit to all people

        socket.emit('go room',
            {
                room,
                messages:messages[room.id]
            });//emit only to client
    });

    socket.on('join room', room => {
        let message = {
            'user_id':0,
            'message': users.find(x => x.id === socket.user_id).username + ' join the room ' + room.name
        };
        socket.broadcast.in(room.id).emit('new message', message);
        messages[room.id].push(message);
        rooms.find(x => x.id === room.id).numUsers++;

        io.sockets.emit('update rooms', rooms);//emit to all people

        socket.emit('go room',
            {
                room,
                messages:messages[room.id]
            });//emit only to client
    });

    socket.on('leave room', room => {
        let message =  {
            'user_id'   :   0,
            'username'  :   'server',
            'message'   :   users.find(x => x.id === socket.user_id).username + ' leave the room ' + room.name
        };
        socket.broadcast.in(room.id).emit('new message', message);
        messages[room.id].push(message);
        rooms.find(x => x.id === room.id).numUsers = (rooms.find(x => x.id === room.id).numUsers === 0) ? 0 : rooms.find(x => x.id === room.id).numUsers - 1;
        io.sockets.emit('update rooms', rooms);//emit to all people
        socket.emit('go leave room');
    });

    socket.on('quit room', room => {
        socket.leave(room.id);
        let message =  {
            'user_id'   :   0,
            'username'  :   'server',
            'message'   :   users.find(x => x.id === socket.user_id).username + ' quit the room ' + room.name
        };
        socket.broadcast.in(room.id).emit('new message', message);

        let myRooms = users.find(x => x.id === socket.user_id).myRooms;
        myRooms = myRooms.filter(item => item !== room.id);
        users.find(x => x.id === socket.user_id).myRooms = myRooms;
        io.sockets.emit('update users', users);//emit to all people

        let idUsers = rooms.find(x => x.id === room.id).users;
        idUsers = idUsers.filter(item => item !== socket.user_id);
        rooms.find(x => x.id === room.id).users = idUsers;
        io.sockets.emit('update rooms', rooms);//emit to all people

        socket.emit('go quit room');
    });

    socket.on('send message', data => {
        let message =  {
            'user_id': socket.user_id,
            'username': users.find(x => x.id === socket.user_id).username,
            'message': data.message
        };
        messages[data.room.id].push(message);
        socket.nsp.to(data.room.id).emit('new message', message);
    });

    socket.on('start typing', roomId => {
        socket.broadcast.to(roomId).emit('new typing', socket.user_id);
    });

    socket.on('stop typing', roomId => {
        socket.broadcast.to(roomId).emit('end typing', socket.user_id);
    });

    socket.on('need update rooms', () => {
        socket.emit('update rooms', rooms);
    });

    socket.on('need update users', () => {
        socket.emit('update users', users);
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', () => {

        console.log('deconnection');
        numUsers--;



    });
});
