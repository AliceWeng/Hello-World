const express = require("express");
const router = express.Router();
const Mood = require("../models/mood");

router.get("/", (req, res) => {
    Mood.find()
        .then(moods => {
            res.json(moods);
        })
        .catch(() => {
            res.status(404);
        });
});

router.post("/", (req, res) => {
    Mood.create(req.body)
        .then(() => {
            res.redirect("/moods");
        })
        .catch(() => {
            res.status(404);
        })
});

module.exports = router;