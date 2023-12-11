const express = require("express");
const cors = requrie("cors");
const noteRoutes = require("./routes/Notes");
const authRoutes = require("./routes/Auth");
const mongoose = require("mongoose");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes); /* REMEMBER EVERYTHING STARTS OFF WITH A '/auth' */
app.use("/notes", noteRoutes); /* REMEMBER EVERYTHING STARTS OFF WITH A '/notes' */

mongoose.connect(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/NoteDb")
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log("port and database connected");
        })
    })
    .catch((err) => {
        console.log(err);
    })