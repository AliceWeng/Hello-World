require("dotenv").config();
const PORT = process.env.PORT;
const URI = process.env.MONGO_URI;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(express.json());
app.use(cors());
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("Connected to database.");
});

app.use("/moods", require("./controllers/moods"));

app.listen(PORT, () => {
    console.log("Server is running.");
});