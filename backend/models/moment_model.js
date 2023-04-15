const mongoose = require("mongoose");

const momentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Moment", momentSchema);