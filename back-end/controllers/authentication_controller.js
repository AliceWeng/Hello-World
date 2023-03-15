const router = require("express").Router();
const User = require("../models/user_model");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    let user = await User.findOne({
        "username": new RegExp(req.body.username, "i")
    });

    if(!user || !await bcrypt.compare(req.body.password, user.password)) {
        res.send("Couldn't find user.");
    } else res.json({ user });
});

module.exports = router;