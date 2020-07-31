const socketio = require('socket.io');
const generateMessage = require('../utils/message');
const getUsersInRoom = require('../utils/user');

const User = require('../models/User');
const Room = require('../models/Room');

const setupSocket = async (server) => {
    const io = socketio(server);

    io.on('connection', (socket) => {
        console.log('New WebSocket connection');

        socket.on('join', async (options, callback) => {
            try {
                console.log('JOIN');
                const username = options.username;
                const user = await User.findOne({username});
                const roomName = user.joined_room.name;

                // join
                socket.join(roomName);

                // welcome messages
                socket.emit('message', generateMessage('Admin', 'Welcome!'));
                socket.broadcast.to(roomName).emit('message',
                    generateMessage('Admin', `${user.username} has joined!`));

                // update user list
                const room = await Room.findOne({name: roomName});
                const users = room.current_users.map((user_obj) => user_obj.username);
                io.to(roomName).emit('roomData', {
                    room: roomName,
                    users
                });
            } catch (e) {
                console.log(e);
            }

            callback();
        });

        socket.on('sendMessage', async ({username, message}, callback) => {
            const user = await User.findOne({username});
            const room = user.joined_room.name;
            const avatar = user.avatar;
            console.log('SEND\n', '\tUser:', username, '\n\tRoom:', room, '\n\tMessage:', message);

            io.to(room).emit('message', generateMessage(username, message, avatar));
            callback();
        });


        socket.on('disconnect', () => {
            console.log('LEAVE');
            // if (user) {
            //     io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`));
            //     io.to(user.room).emit('roomData', {
            //         room: user.room,
            //         users: getUsersInRoom(user.room)
            //     });
            // }
        })
    })
};

module.exports = setupSocket;