const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    moment: {
        type: Schema.Types.ObjectId,
        ref: "Moment"
    },
    comment: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);