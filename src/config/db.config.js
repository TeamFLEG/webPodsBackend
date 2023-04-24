// Description: This file contains the database connection configuration

const mongoose = require("mongoose");

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
    console.log("Connected to the database");
});

mongoose.connection.on("error", (err) => {
    console.log(`Error: ${err}`);
});