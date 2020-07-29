const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const normalize = require('normalize-url');

const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route    GET api/users/me
// @desc     Find joined room
// @access   Private
router.get(
    '/me', auth, async (req, res) => {
        try {
            const room = await User
                .findById(req.user.id)
                .select('joined_rooms owned_rooms');
            res.json(room);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
    '/',
    [
        check('username', 'Username is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({min: 6})
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {username, email, password} = req.body;

        try {
            let user = await User.findOne({email});

            if (user) {
                return res
                    .status(400)
                    .json({errors: [{msg: 'User already exists'}]});
            }

            const avatar = normalize(
                gravatar.url(email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                }),
                {forceHttps: true}
            );

            user = new User({
                username,
                email,
                avatar,
                password
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {expiresIn: '5 days'},
                (err, token) => {
                    if (err) throw err;
                    res.json({token});
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
