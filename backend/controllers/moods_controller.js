const express = require("express");
const router = express.Router();
const Mood = require("../models/mood_model");

router.get("/", (req, res) => {
    Mood.find()
        .populate("user")
        .then(moods => {
            res.status(200).json(moods);
        })
        .catch(() => {
            res.status(500).send("Server error.");
        });
});

router.post("/", (req, res) => {
    Mood.create()
        .then(data => {
            res.status(201).json(data);
        })
        .catch(() => {
            res.status(500).send("Server error.");
        });
});

module.exports = router;