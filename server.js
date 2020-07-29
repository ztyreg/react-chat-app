const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const connectDB = require('./config/db');
// const Filter = require('bad-words');
const {generateMessage, generateLocationMessage} = require('./utils/messages');
const {addUser, removeUser, getUser, getUsersInRoom} = require('./utils/users');
const cors = require('cors')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 5000;
// const publicDirectoryPath = path.join(__dirname, '../../public');

connectDB();

app.use(cors());
app.use(express.json({extended: false}));
// app.use(express.static(publicDirectoryPath))

// routes
app.get('/', (req, res) => res.send('API running'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/rooms', require('./routes/api/rooms'));

io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.on('join', (options, callback) => {
        console.log('Joined!');
        const {error, user} = addUser({id: socket.id, ...options});

        if (error) {
            return callback(error);
        }

        socket.join(user.room);

        // socket.emit('message', generateMessage('Admin', 'Welcome!'));
        // socket.broadcast.emit('message',
        //     generateMessage('Admin', `A new user has joined!`));
        socket.broadcast.to(user.room).emit('message',
            generateMessage('Admin', `${user.username} has joined!`));

        // update user list
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        });

        callback();
    })

    socket.on('sendMessage', (message, callback) => {
        console.log('Got', message);
        const user = getUser(socket.id);

        io.to(user.room).emit('message', generateMessage(user.username, message));
        callback();
    })


    socket.on('disconnect', () => {
        console.log('Left!');
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})

