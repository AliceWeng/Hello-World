require("dotenv").config();
const PORT = process.env.PORT;
const URI = process.env.MONGO_URI;
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../build")));
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Connected to database.");
});

app.use("/api/user", require("./controllers/user_controller"));
app.use("/api/moods", require("./controllers/moods_controller"));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(PORT, () => {
    console.log("Server is running.");
});