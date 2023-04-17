const mongoose = require("mongoose");

const momentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 300
    }
}, { timestamps: true });

module.exports = mongoose.model("Moment", momentSchema);