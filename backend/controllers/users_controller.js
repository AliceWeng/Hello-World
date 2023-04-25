const router = require("express").Router();
const User = require("../models/user_model");
const bcrypt = require("bcrypt");

// finds a user based on id stored in cookie session, used for AuthContext.
router.get("/auth", (req, res) => {
    User.findOne({_id: req.session.userId})
        .lean()
        .then(user => res.status(200).json(user))
        .catch(() => res.status(404).json(null));
});

// checks if a username is taken, used for SignUpForm.
// checks if a user exists, used for ProfilePage.
router.get("/:username", (req, res) => {
    User.findOne({username: new RegExp("^" + req.params.username + "$", "i")})
        .lean()
        .then(user => res.status(200).json(user))
        .catch(() => res.status(404).json(null));
});

// hashes password and creates a new user, used for SignUpForm.
router.post("/", async (req, res) => {
    let hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
        nickname: req.body.nickname,
        username: req.body.username,
        password: hashedPassword,
    });
    res.status(201).send("Your account has been successfully created.");
});

// authenticates a user based on username and password input, used for LogInForm.
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

// destroys cookie session, used for NavBar.
router.delete("/auth", (req, res) => {
    req.session = null;
    res.status(200).send("You have successfully logged out.");
});

module.exports = router;