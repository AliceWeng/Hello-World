const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    text: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    private: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("Mood", moodSchema);