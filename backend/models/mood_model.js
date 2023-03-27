const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    mood: {
        type: String,
        required: true
    },
    color: {
        type: String,
    },
    date: {
        type: Date,
    }
});

module.exports = mongoose.model("Mood", moodSchema);