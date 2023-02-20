const express = require("express");
const router = express.Router();
const Mood = require("../models/mood_model");

router.get("/", (req, res) => {
    Mood.find()
        .populate("user")
        .then(moods => {
            res.json(moods);
        });
});

router.post("/", (req, res) => {
    try {
        Mood.create(req.body);
    } catch(error) {
        
    }
});

module.exports = router;