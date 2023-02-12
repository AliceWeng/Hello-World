const express = require("express");
const router = express.Router();
const Mood = require("../models/mood_model");

router.get("/", (req, res) => {
    Mood.find()
        .then(moods => {
            res.json(moods);
        });
});

router.post("/", (req, res) => {
    Mood.create(req.body);
});

module.exports = router;