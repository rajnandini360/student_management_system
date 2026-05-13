const express = require("express");
const cors = require("cors");

const app = express();


// MIDDLEWARE
app.use(cors());
app.use(express.json());


// ROUTES
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/students", studentRoutes);
app.use("/auth", authRoutes);


// SERVER
app.listen(5000, () => {
    console.log("Server running on port 5000");
});