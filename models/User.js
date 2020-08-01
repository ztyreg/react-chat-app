const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    joined_room: {
        name: {
            type: String,
            default: null
        },
        time_joined: {
            type: Date,
            default: Date.now(),
        },
        owner: {
            type: Boolean,
            default: false,
        },
        required: false,
        default: null
    }
});

module.exports = User = mongoose.model('user', UserSchema);