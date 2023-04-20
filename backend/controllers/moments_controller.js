const express = require("express");
const router = express.Router();
const User = require("../models/user_model");
const Moment = require("../models/moment_model");

router.get("/", (req, res) => {
    Moment.find()
        .populate("user")
        .then(moments => res.status(200).json(moments))
        .catch(() => res.status(500).send("Server error."));
});

router.get("/:id", (req, res) => {
    Moment.findById(req.params.id)
        .populate("user")
        .then(moment => res.status(200).json(moment))
        .catch(() => res.status(404).json(null));
});

// finds moments posted by a specific user.
router.get("/username/:username", async (req, res) => {
    let user = await User.findOne({username: new RegExp("^" + req.params.username + "$", "i")});

    Moment.find({ user: user._id })
        .sort({createdAt: -1})
        .populate("user")
        .then(moments => res.status(200).json(moments))
        .catch(() => res.status(404).json(null));
});

// creates a new moment.
router.post("/", (req, res) => {
    Moment.create({
        user: req.session.userId,
        ...req.body
    }).then(() => res.status(201).send("Your post has been successfully created."))
      .catch(() => res.status(500).send("Server error."));
});

router.delete("/:id", (req, res) => {
    Moment.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).send("Your post has been successfully deleted."))
        .catch(() => res.status(500).send("Server error."));
});

module.exports = router;