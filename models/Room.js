const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    owner_username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    is_private: {
        type: Boolean,
        required: true
    },
    password: {
        type: String,
    },
    current_users: [
        {
            username: {
                type: String,
                required: true
            },
            join_time: {
                type: Date,
                required: true,
                default: Date.now()
            }
        }
    ],
    banned_users: [
        {
            username: {
                type: String,
                required: true
            }
        }
    ],
    messages: [
        {
            username: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            },
            time: {
                type: Date,
                required: true
            }
        }
    ]
});

module.exports = Room = mongoose.model('room', RoomSchema);
