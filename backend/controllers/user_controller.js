const router = require("express").Router();
const User = require("../models/user_model");
const bcrypt = require("bcrypt");

router.get("/username/:username", async (req, res) => {
    let user = await User.findOne({
        username: new RegExp(req.body.username, "i")
    });
    res.send(user);
});

router.post("/", async (req, res) => {
    try {
        let hashedPassword = await bcrypt.hash(req.body.password, 12);
        await User.create({
            nickname: req.body.nickname,
            username: req.body.username.toLowerCase(),
            password: hashedPassword,
            email: req.body.username.toLowerCase(),
            birthday: req.body.birthday
        });
        res.status(201).send("Your account has been successfully created.");
    } catch {
        res.status(500).send("Server error.");
    }
});

router.post("/login", async (req, res) => {
    if(!req.body.username) {
        return res.status(400).json({message: "Please fill out all required fields."});
    }
    let user = await User.findOne({
        "username": new RegExp(req.body.username, "i")
    });
    if(!user) {
        return res.status(401).json({message: "The username you entered doesn't exist."});
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)) {
            res.status(200).json({message: "You have successfully logged in.", user});
        } else res.status(401).json({message: "The password you entered is incorrect."});
    } catch {
        res.status(500).json({message: "Server error."});
    }
});

module.exports = router;