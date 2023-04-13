const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    mood: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Mood", moodSchema);