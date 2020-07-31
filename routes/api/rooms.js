const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');

const auth = require('../../middleware/auth');

const Room = require('../../models/Room');
const User = require('../../models/User');


// @route    GET api/rooms
// @desc     Get room
// @access   Private
router.get('/', auth, async (req, res) => {
        try {
            // find joined room
            const user = await User.findById(req.user.id);

            return res.status(200).send(user);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route    POST api/rooms
// @desc     Join room
// @access   Private
router.post('/',
    [
        auth,
        check('name', 'Room name is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {name, password} = req.body;
        const clean_password = password ? password : "";

        const room_obj = await Room.findOne({name});
        const room_password = room_obj.password;

        const isMatch = await bcrypt.compare(clean_password, room_password);

        if (!isMatch) {
            return res
                .status(400)
                .json({errors: [{msg: 'Invalid Credentials'}]});
        }

        try {
            // find joined room
            await User.findByIdAndUpdate(req.user.id, {
                joined_room: {name, owner: false},
            });
            const user = await User.findById(req.user.id);
            room_obj.current_users.push({username: user.username});
            await Room.findByIdAndUpdate(room_obj._id, {current_users: room_obj.current_users})

            return res.status(200).send(user);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route    POST api/rooms/create
// @desc     Create room
// @access   Private
router.post(
    '/create',
    [
        auth,
        check('owner_username', 'Error: owner id not provided').not().isEmpty(),
        check('name', 'Room name is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {owner_username, name, password} = req.body;

        const is_private = !!password;
        const clean_password = password ? password : "";

        try {
            // create room
            const room = new Room({
                owner_username,
                name,
                is_private,
                current_users: [{username: owner_username}]
            });

            const salt = await bcrypt.genSalt(10);

            room.password = await bcrypt.hash(clean_password, salt);

            await room.save();

            // join creator to room
            await User.findByIdAndUpdate(req.user.id, {
                joined_room: {name: room.name, owner: true}
            });

            return res.status(200).send({joined_room: room.name, owner: true});

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route    DELETE api/rooms
// @desc     Leave room
// @access   Private
router.delete('/', auth, async (req, res) => {
        try {
            const user = await User.findById(req.user.id);
            const room = await Room.findOne({name: user.joined_room.name});
            await Room.findOneAndUpdate({name: user.joined_room.name},
                {current_users: room.current_users.filter((user_obj) => user_obj.username !== user.username)}
            );

            await User.findByIdAndUpdate(req.user.id, {
                joined_room: null,
            });

            return res.status(200).send(user);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
