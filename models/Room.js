const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    owner_username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
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
            user_id: {
                type: Number,
                required: true
            },
            join_time: {
                type: Date,
                required: true
            }
        }
    ],
    banned_users: [
        {
            user_id: {
                type: Number,
                required: true
            }
        }
    ],
    messages: [
        {
            author_id: {
                type: Number,
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
