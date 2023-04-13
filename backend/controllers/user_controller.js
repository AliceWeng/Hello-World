const router = require("express").Router();
const User = require("../models/user_model");
const bcrypt = require("bcrypt");

//
router.get("/auth", (req, res) => {

    User.findOne({
        _id: req.session.userId
    }).then(user => res.json(user))
      .catch(() => res.json(null));
});

// searches database for a match to sign up form's username input, checks if username is taken.
router.get("/:username", (req, res) => {
    User.findOne({
        username: new RegExp("^" + req.params.username + "$", "i")
    }).then(user => res.send(user.username))
      .catch(() => res.send(null));
});

// hashes sign up form's password input, creates a new user.
router.post("/", async (req, res) => {
    let hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
        nickname: req.body.nickname,
        username: req.body.username,
        password: hashedPassword,
    });
    res.status(201).send("Your account has been successfully created.");
});

// compares database username and password to log in form's input, authenticates user.
router.post("/auth", async (req, res) => {
    if(!req.body.username || !req.body.password) {
        return res.status(400).json({message: "Please fill out all required fields."});
    }
    let user = await User.findOne({
        "username": new RegExp("^" + req.body.username + "$", "i")
    });
    if(!user) {
        return res.status(401).json({message: "The username you entered doesn't exist."});
    }   
    if(await bcrypt.compare(req.body.password, user.password)) {
        req.session.userId = user._id;
        res.status(200).json({message: "You have successfully logged in."});
    } else {
        res.status(401).json({message: "The password you entered is incorrect."});
    }
});

// destroys cookie session.
router.delete("/auth", (req, res) => {
    req.session = null;
    res.send("You have successfully logged out.");
});

module.exports = router;