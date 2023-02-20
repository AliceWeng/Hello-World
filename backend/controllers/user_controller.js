const router = require("express").Router();
const User = require("../models/user_model");

router.post("/", (req, res) => {
        User.create(req.body)
            .then(data => {
                res.status(201).json(data);
            })
            .catch(() => {
                res.status(500).send("Server error.")
            })
});

module.exports = router;