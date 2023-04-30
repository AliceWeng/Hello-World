const router = require("express").Router();
const User = require("../models/user_model");
const Moment = require("../models/moment_model");

// finds all moments, used for HomePage.
router.get("/", (req, res) => {
    Moment.find()
        .lean()
        .sort({createdAt: -1})
        .skip(req.query.number)
        .limit(10)
        .populate({
            path: "user",
            select: "nickname username -_id"
        })
        .then(moments => res.status(200).json(moments));
});

// counts the number of moments based on user's params username, used for ProfilePage.
router.get("/user/:username/count", async (req, res) => {
    let user = await User.findOne({username: new RegExp("^" + req.params.username + "$", "i")}).lean();
    let count = await Moment.countDocuments({user: user._id});
    res.status(200).json(count);
});

// finds all moments based on user's params username, used for ProfilePage.
router.get("/user/:username", async (req, res) => {
    let user = await User.findOne({username: new RegExp("^" + req.params.username + "$", "i")}).lean();
    Moment.find({user: user._id})
        .lean()
        .sort({createdAt: -1})
        .skip(req.query.number)
        .limit(10)
        .populate({
            path: "user",
            select: "nickname username -_id"
        })
        .then(moments => res.status(200).json(moments));
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

// creates a new moment, used for MomentForm.
router.post("/", async (req, res) => {
    let newMoment = await Moment.create({
        user: req.session.userId,
        ...req.body
    });
    let populatedMoment = await newMoment.populate({
        path: "user",
        select: "nickname username -_id"
    });
    res.status(201).json(populatedMoment);
});

// finds a moment based on params id and updates it with request body, used for EditMomentForm.
router.put("/:id", (req, res) => {
    Moment.findById(req.params.id)
        .lean()
        .then(async moment => {
            if(moment.user.toString() === req.session.userId) {
                let updatedMoment = await Moment.findByIdAndUpdate(req.params.id, req.body);
                updatedMoment.post = req.body.post;
                let populatedMoment = await updatedMoment.populate({
                    path: "user",
                    select: "nickname username -_id"
                });
                res.status(200).json(populatedMoment);
            } else {
                res.status(401);
            }
        })
        .catch(() => res.status(404).json(null));
    }
);

// deletes a moment based on params id, used for Moment.
router.delete("/:id", (req, res) => {
    Moment.findById(req.params.id)
        .lean()
        .then(async moment => {
            if(moment.user.toString() === req.session.userId) {
                await Moment.findByIdAndDelete(req.params.id);
                res.status(200).send("Your moment has been successfully deleted.");
            } else {
                res.status(401);
            }
        })
        .catch(() => res.status(404).send("Moment not found."));
});

module.exports = router;