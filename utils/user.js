const Room = require('../models/Room');

const getUsersInRoom = async (roomName) => {
    const room = await Room.findOne({name: roomName});
    return room.current_users.map((user_obj) => user_obj.username);
};

module.exports = getUsersInRoom;