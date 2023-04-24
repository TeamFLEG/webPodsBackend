const express = require("express");
const router = express.Router();

const { addData } = require("../middlewares/users/users");
// TODO: Add the routes for the user management system

router.get("/", (req, res) => {
    res.send("Hello World!");
});
router.post("/add", (req, res) => {
    const data = req.body;
    console.log(data);
    res.json({ message: "Data added successfully" });
});

module.exports = router;