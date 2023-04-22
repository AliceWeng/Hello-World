const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    moment: {
        type: Schema.Types.ObjectId,
        ref: "Moment",
        required: true
    },
    post: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 300
    }
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);