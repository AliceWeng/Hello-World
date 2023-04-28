const router = require("express").Router();
const Comment = require("../models/comment_model");

// finds all comments based on moment's params id, used for MomentPage.
router.get("/moment/:id", (req, res) => {
    Comment.find({moment: req.params.id})
        .lean()
        .sort({createdAt: -1})
        .skip(req.query.number)
        .limit(10)
        .populate({
            path: "user",
            select: "nickname username -_id"
        })
        .then(comments => res.status(200).json(comments));
});

// counts the number of comments based on moment's params id, used for MomentPage.
router.get("/moment/:id/count", (req, res) => {
    Comment.countDocuments({moment: req.params.id})
        .then(count => res.status(200).json(count));
});

// creates a new comment, used for CommentForm.
router.post("/", async (req, res) => {
    let newComment = await Comment.create({
        user: req.session.userId,
        ...req.body
    });
    let populatedComment = await newComment.populate({
        path: "user",
        select: "nickname username -_id"
    });
    res.status(201).json(populatedComment);
});

// deletes a comment based on params id, used for Comment.
router.delete("/:id", (req, res) => {
    if(req.session.userId) {
        Comment.findByIdAndDelete(req.params.id)
            .then(() => res.status(200).send("Your comment has been successfully deleted."))
            .catch(() => res.status(404).send("Comment not found."));
    }
});

module.exports = router;