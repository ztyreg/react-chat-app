const socketio = require('socket.io');
const {generateMessage, generatePrivateMessage} = require('../utils/message');
const getUsersInRoom = require('../utils/user');

const User = require('../models/User');
const Room = require('../models/Room');


const setupSocket = async (server) => {
    const io = socketio(server);
    const ids = new Map();

    io.on('connection', (socket) => {
        console.log('New WebSocket connection');

        socket.on('join', async (options, callback) => {
            ids.set(options.username, socket.id);
            try {
                console.log('JOIN');
                if (!options.joined_room) {
                    // no room joined
                    callback();
                    return;
                }
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
                io.to(roomName).emit('roomData', {
                    room: roomName,
                    users: await getUsersInRoom(roomName)
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

        socket.on('sendPrivateMessage', async ({username, member, message}, callback) => {
            const user = await User.findOne({username});
            const room = user.joined_room.name;
            const avatar = user.avatar;
            console.log('SEND PRIVATE\n',
                '\tUser:', username,
                '\n\tRoom:', room,
                '\n\tMember: ', member,
                '\n\tMessage:', message);

            io.to(ids.get(member)).emit('message', generatePrivateMessage(username, message, avatar));
            callback();
        });


        socket.on('disconnect', () => {
            console.log('DISCONNECT');
        });

        socket.on('leave', async (options, callback) => {
            console.log('LEAVE');
            try {
                const roomName = options.joined_room.name;
                io.to(roomName).emit('message',
                    generateMessage('Admin', `${options.username} has left!`));
                io.to(roomName).emit('roomData', {
                    room: roomName,
                    users: await getUsersInRoom(roomName)
                });
            } catch (e) {
                console.log(e);
            }
            callback();
        });
    })
};

module.exports = setupSocket;