const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');

const auth = require('../../middleware/auth');

const Room = require('../../models/Room');

router.get(
    '/me', auth, async (req, res) => {

    }
);

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
    '/',
    [
        check('owner_username', 'Error: owner id not provided').not().isEmpty(),
        check('name', 'Room name is required').not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {owner_username, name, is_private, password} = req.body;

        if (is_private) {
            if (!password) {
                return res.status(400).json({errors: ['Password is required for private rooms']});
            }
        }

        try {
            const room = new Room({
                owner_username,
                name,
                is_private,
                password,
                current_users: [{username: owner_username}]
            });

            const salt = await bcrypt.genSalt(10);

            room.password = await bcrypt.hash(password, salt);

            await room.save();

            return res.status(200).send();

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
