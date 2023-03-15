const router = require("express").Router();
const User = require("../models/user_model");

router.get("/username/:username", (req, res) => {
    const username = req.params.username;

    User.findOne({ username: username })
        .then(response => res.send(response));
});

router.post("/", (req, res) => {
        User.create(req.body)
            .then(data => {
                res.status(201).json(data);
            })
            .catch(() => {
                res.status(500).send("Server error.")
            });
});

module.exports = router;