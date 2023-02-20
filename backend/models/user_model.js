const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    nickname: {
        type: String,
        required
    },
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    birthday: {
        type: Date,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);