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
    owned_rooms: [
        {
            name: {
                type: String
            }
        }
    ],
    joined_rooms: [
        {
            name: {
                type: String
            },
            time_joined: {
                type: Date,
                default: Date.now()
            }
        }
    ]
});

module.exports = User = mongoose.model('user', UserSchema);