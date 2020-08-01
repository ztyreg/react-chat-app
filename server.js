const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors')

const connectDB = require('./config/db');
const setupSocket = require('./config/socket');

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 5000;

connectDB();
setupSocket(server);

app.use(cors());
app.use(express.json({extended: false}));

// routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/rooms', require('./routes/api/rooms'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})
