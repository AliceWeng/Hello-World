const router = require("express").Router();
const User = require("../models/user_model");
const bcrypt = require("bcrypt");

router.get("/username/:username", (req, res) => {
    const username = req.params.username;

    User.findOne({ username: username })
        .then(response => res.send(response));
});

router.post("/", async (req, res) => {
    try {
        let hashedPassword = await bcrypt.hash(req.body.password, 12);
        User.create({
            username: req.body.username,
            password: hashedPassword
        });
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
});

router.post("/login", async (req, res) => {
    let user = await User.findOne({
        "username": new RegExp(req.body.username, "i")
    });
    
    if(!user) {
        return res.status(404).send("User couldn't be found.");
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)) {
            res.send("You have successfully logged in.");
        } else res.send("The password is incorrect.");
    } catch {
        res.status(500).send();
    }
});

module.exports = router;