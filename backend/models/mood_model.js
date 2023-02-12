const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    text: {
        type: String,

    },
    color: {
        type: String,

    },
    private: {
        type: Boolean,

    },
    date: {
        type: Date,

    }
});

module.exports = mongoose.model("Mood", moodSchema);