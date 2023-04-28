const router = require("express").Router();
const Comment = require("../models/comment_model");

router.get("/count/:id", async (req, res) => {
    Comment.countDocuments({moment: req.params.id})
        .then(count => res.status(200).json(count))
        .catch(() => res.status(500).send("Server error."));
});

// finds all comments based on moment's params id, used for MomentPage.
router.get("/:id", async (req, res) => {
    Comment.find({moment: req.params.id})
        .lean()
        .sort({createdAt: -1})
        .skip(req.query.number)
        .limit(10)
        .populate({
            path: "user",
            select: "nickname username -_id"
        })
        .then(comments => res.status(200).json(comments))
        .catch(() => res.status(500).send("Server error."));
});

// creates a new comment, used for CommentForm.
router.post("/", (req, res) => {
    Comment.create({
        user: req.session.userId,
        ...req.body
    }).then(newComment => res.status(201).json(newComment))
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