const http = require('http');
const express = require('express');
const cors = require('cors')

const connectDB = require('./config/db');
const setupSocket = require('./config/socket');

const app = express();
const server = http.createServer(app);
const config = require('config');

const port = process.env.PORT || config.serverPort;

connectDB();
setupSocket(server);

app.use(cors());
app.use(express.json({extended: false}));

// routes
app.get('/', (req, res) => res.send('API running'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/rooms', require('./routes/api/rooms'));




server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})

