const addData = (req, res, next) => {
    const data = req.body;
    console.log(data);
    res.json({ message: "Data added successfully" });
};

module.exports = { addData };