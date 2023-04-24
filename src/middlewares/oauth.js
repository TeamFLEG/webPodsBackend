const User = require("../models/users.js");
const getGoogleUser = require("../helpers/getGoogleUser.js");
const getGoogleAuthURL = require("../helpers/getGoogleAuthURL.js");

const googleAuth = async (req, res) => {
    const googleUser = await getGoogleUser({ code: req.body.code });

    let user = await User.findOne({ email: googleUser.email });

    if (!user) {
        user = new User({
            email: googleUser.email,
            password: googleUser.name + googleUser.id,
        });
        await user.save();
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    res.status(200).json({ token: token });
};

const getURL = (req, res) => {
    res.send(getGoogleAuthURL());
};

module.exports = {
    googleAuth,
    getURL,
};