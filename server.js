const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const connectDB = require('./config/db');
const {generateMessage} = require('./utils/messages');
const {addUser, removeUser, getUser, getUsersInRoom} = require('./utils/users');
const cors = require('cors')

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const config = require('config');

const port = process.env.PORT || config.serverPort;

connectDB();

app.use(cors());
app.use(express.json({extended: false}));
// app.use(express.static(publicDirectoryPath))

// routes
app.get('/', (req, res) => res.send('API running'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/rooms', require('./routes/api/rooms'));

const User = require('./models/User');

io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.on('join', async (options, callback) => {
        try {
            console.log('JOIN');
            const username = options.username;
            const user = await User.findOne({username});
            const room = user.joined_room.name;
            // const {error, user} = addUser({id: socket.id, ...options});

            // if (error) {
            //     return callback(error);
            // }

            socket.join(room);

            // socket.emit('message', generateMessage('Admin', 'Welcome!'));
            // socket.broadcast.emit('message',
            //     generateMessage('Admin', `A new user has joined!`));
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
        console.log('SEND\n', '\tUser:', username, '\n\tRoom:', room, '\n\tMessage:', message);

        io.to(room).emit('message', generateMessage(username, message));
        callback();
    });


    socket.on('disconnect', () => {
        console.log('Left!');
        // const user = removeUser(socket.id);
        //
        // if (user) {
        //     io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`));
        //     io.to(user.room).emit('roomData', {
        //         room: user.room,
        //         users: getUsersInRoom(user.room)
        //     });
        // }
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})

