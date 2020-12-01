const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');


const Appt = require('../../models/Appt');
const User = require('../../models/User');



// @route    GET api/appts/current
// @desc     Get list of appointments for user
// @access   PRIVATE
router.get('/current', auth, async (req, res) => {
    try {
        const appts = await Appt.find({user: req.user.id}).populate('user', ['name']);

        if (!appts || appts.length === 0) {
            return res.status(400).json({ msg: 'There are no appointments for this user' });
        }

        res.json(appts);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



// @route    GET api/appts
// @desc     Get list of all appointments
// @access   PRIVATE

router.get('/', auth, async (req, res) => {

    try {
        const appts = await Appt.find({}); 

        if (appts.length === 0) {
            return res.status(400).json({ msg: "no appointments for user" });
        }

        return res.json(appts);

    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});



// @route    POST api/appts
// @desc     create new appointment
// @access   PRIVATE
router.post('/',
    [auth, 
        [check('name', 'Name is required')
            .not()
            .isEmpty()
        ]
    ],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        spot,
        name,
        doctor,
        time,
        arrvTime,
        tech,
        room,
        description,
    } = req.body;

    //Build appt object
    const apptFields = {};
    apptFields.user = req.user.id;
    if (spot) apptFields.spot = spot;
    apptFields.name = name;
    if (doctor) apptFields.doctor = doctor;
    if (tech) apptFields.tech = tech;
    if (time) apptFields.time = time;
    if (arrvTime) apptFields.arrvTime = arrvTime;
    if (room) apptFields.room = room;
    if (description) apptFields.description = description;

    try {
        const appt = new Appt({...apptFields});
        await appt.save();

        return res.json(appt);

    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }

});

module.exports = router;