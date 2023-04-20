require("dotenv").config();
const PORT = process.env.PORT;
const URI = process.env.MONGO_URI;
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("cookie-session");

app.use(session({
    name: "session",
    sameSite: "strict",
    domain: `${process.env.DOMAIN}`,
    keys: [process.env.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(cors({
    origin: `${process.env.ORIGIN}`,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "../frontend/build")));
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Connected to database.");
});

app.use("/api/users", require("./controllers/users_controller"));
app.use("/api/moments", require("./controllers/moments_controller"));
app.use("/api/comments", require("./controllers/comments_controller"));

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
// });

app.listen(PORT, () => {
    console.log("Server is running.");
});