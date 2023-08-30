const express = require("express");
const router = express.Router();

const Room = require('../models/room');
const { Route } = require("router");
router.get("/getallrooms", async (req, res) => {
    try {
        const rooms = await Room.find({})
        res.send(rooms)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.get("/getroombyid/:id", async (req, res) => {
    const roomid = req.params.id
    try {
        const rooms = await Room.findOne({ _id:roomid })
        res.send(rooms)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.all
router.post("/addroom", async (req, res) => {
    try {
        constnewroom = new Room(req.body)
        await newroom.save()

        res.send('new Room Added successfully')
    } catch (error) {

        return res.status(400).json({ error });

    }
})

module.exports = router;