const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    nickname: {
        type: String,
        required
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("User", userSchema);