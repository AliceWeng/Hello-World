const express = require("express");
const router = express.Router();
const User = require("../models/user_model");
const Moment = require("../models/moment_model");

// finds all moments, used for HomePage.
router.get("/", (req, res) => {
    Moment.find()
        .lean()
        .limit(6)
        .populate({
            path: "user",
            select: "nickname username -_id"
        })
        .sort({createdAt: -1})
        .then(moments => res.status(200).json(moments))
        .catch(() => res.status(500).send("Server error."));
});

// finds a moment based on params id, used for MomentPage.
router.get("/:id", (req, res) => {
    Moment.findById(req.params.id)
        .lean()
        .populate({
            path: "user",
            select: "nickname username -_id"
        })
        .then(moment => res.status(200).json(moment))
        .catch(() => res.status(404).json(null));
});

// finds all moments posted by a user based on params id, used for ProfilePage.
router.get("/user/:username", async (req, res) => {
    let user = await User.findOne({username: new RegExp("^" + req.params.username + "$", "i")}).lean();

    Moment.find({user: user._id})
        .lean()
        .limit(10)
        .populate({
            path: "user",
            select: "nickname username -_id"
        })
        .sort({createdAt: -1})
        .then(moments => res.status(200).json(moments))
        .catch(() => res.status(404).json(null));
});

// creates a new moment, used for MomentForm.
router.post("/", (req, res) => {
    Moment.create({
        user: req.session.userId,
        ...req.body
    }).then(() => res.status(201).send("Your post has been successfully created."))
      .catch(() => res.status(500).send("Server error."));
});

// deletes a moment based on params id, used for Moment.
router.delete("/:id", (req, res) => {
    if(req.session.userId) {
        Moment.findByIdAndDelete(req.params.id)
            .then(() => res.status(200).send("Your post has been successfully deleted."))
            .catch(() => res.status(500).send("Server error."));
    }
});

module.exports = router;