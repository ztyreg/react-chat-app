const moment = require('moment');

const generateMessage = (author, content, avatar) => ({
    author,
    content,
    avatar,
    createdAt: moment().calendar()
});

const generatePrivateMessage = (author, content, avatar) => ({
    author,
    content: '[Private] ' + content,
    avatar,
    createdAt: moment().calendar()
});

module.exports = {generateMessage, generatePrivateMessage};