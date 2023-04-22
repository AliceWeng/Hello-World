const mongoose = require("mongoose");
const Comment = require("./comment_model");

const momentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    post: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 300
    }
}, { timestamps: true });

momentSchema.post("create", function() {
    momentSchema.findByIdAndUpdate({moment: this._conditions._id})
});

momentSchema.post("findOneAndDelete", function() {
    Comment.deleteMany({moment: this._conditions._id})
        .then(() => console.log("👍"))
        .catch(() => console.log("👎"));
});

module.exports = mongoose.model("Moment", momentSchema);