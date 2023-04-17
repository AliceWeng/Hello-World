const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    nickname: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 26
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 4,
        maxLength: 12
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);