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
    post: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 300
    }
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);