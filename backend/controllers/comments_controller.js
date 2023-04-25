const router = require("express").Router();
const Comment = require("../models/comment_model");

// finds all comments based on moment's params id, used for MomentPage.
router.get("/:id", (req, res) => {
    Comment.find({moment: req.params.id})
        .lean()
        .limit(10)
        .populate("user")
        .sort({createdAt: -1})
        .then(comments => res.status(200).json(comments))
        .catch(() => res.status(500).send("Server error."));
});

// creates a new comment, used for CommentForm.
router.post("/", (req, res) => {
    Comment.create({
        user: req.session.userId,
        ...req.body
    }).then(() => res.status(201).send("Your comment has been successfully created."))
      .catch(() => res.status(500).send("Server error."));
});

// deletes a comment based on params id, used for Comment.
router.delete("/:id", (req, res) => {
    if(req.session.userId) {
        Comment.findByIdAndDelete(req.params.id)
            .then(() => res.status(200).send("Your comment has been successfully deleted."))
            .catch(() => res.status(500).send("Server error."));
    }
});

module.exports = router;