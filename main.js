// Description: This is the main file of the project

// Get the environment variables
require("dotenv").config();

// Connect to the database
require("./src/config/db.config");

// Import the express module
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: true }));
// Make the app use the json parser
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));


// Import the routes
const authRoute = require("./src/routes/auth");
const usersRoute = require("./src/routes/users");

// Route middlewares
app.use("/auth", authRoute);
app.use("/users", usersRoute);

app.get("/", (req, res) => {
    res.send("WebPods API is running");
});

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`);
});
