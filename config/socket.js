const mongoose = require('mongoose');
const config = require('config');
const socketio = require('socket.io');

const User = require('./models/User');

const setupSocket = async (server) => {
    const io = socketio(server);

    io.on('connection', (socket) => {
        console.log('New WebSocket connection');

        socket.on('join', async (options, callback) => {
            try {
                console.log('JOIN');
                const username = options.username;
                const user = await User.findOne({username});
                const room = user.joined_room.name;

                // join
                socket.join(room);

                // welcome messages
                socket.emit('message', generateMessage('Admin', 'Welcome!'));
                socket.broadcast.to(room).emit('message',
                    generateMessage('Admin', `${user.username} has joined!`));

                // update user list
                io.to(room).emit('roomData', {
                    room: room,
                    users: getUsersInRoom(room)
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

            io.to(room).emit('message', {
                author: username,
                content: message,
                avatar,
                createdAt: moment().calendar()
            });
            callback();
        });


        socket.on('disconnect', () => {
            console.log('Left!');
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