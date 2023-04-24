const router = require("express").Router();
const User = require("../models/user_model");
const bcrypt = require("bcrypt");

// finds user based on id stored in cookie session.
router.get("/auth", (req, res) => {
    User.findOne({_id: req.session.userId})
        .lean()
        .then(user => res.status(200).json(user))
        .catch(() => res.status(404).json(null));
});

// searches database for a match to sign up form's username input, checks if username is taken.
router.get("/:username", (req, res) => {
    User.findOne({username: new RegExp("^" + req.params.username + "$", "i")})
        .lean()
        .then(user => res.status(200).json(user))
        .catch(() => res.status(404).json(null));
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

// compares log in form's input to database's username and password, authenticates user.
router.post("/auth", async (req, res) => {
    if(!req.body.username || !req.body.password) {
        return res.status(400).json({message: "Please fill out all required fields."});
    }
    let user = await User.findOne({
        username: new RegExp("^" + req.body.username + "$", "i")
    });
    if(!user) {
        return res.status(401).json({message: "The username you entered doesn't exist."});
    }   
    if(await bcrypt.compare(req.body.password, user.password)) {
        req.session.userId = user._id;
        res.status(200).json({user: user});
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