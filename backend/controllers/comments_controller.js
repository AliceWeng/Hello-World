const router = require("express").Router();
const Comment = require("../models/comment_model");

router.get("/:id", (req, res) => {
    Comment.find({moment: req.params.id})
        .sort({createdAt: -1})
        .populate("user")
        .then(comments => res.status(200).json(comments))
        .catch(() => res.status(500).json({message: "No comments yet."}));
});

router.post("/", (req, res) => {
    Comment.create({
        user: req.session.userId,
        ...req.body
    }).then(() => res.status(201).send("Your comment has been successfully created."))
      .catch(() => res.status(500).send("Server error."));
});

router.delete("/:id", (req, res) => {
    if(req.session.userId) {
    Comment.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).send("Your comment has been successfully deleted."))
        .catch(() => res.status(500).send("Server error."));
    }
});

module.exports = router;