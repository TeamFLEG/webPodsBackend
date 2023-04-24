const User = require("../../models/users");
const Podcast = require("../../models/podcasts");

// Get user data
const getUserData = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
}

// Get all podcasts of a user
const getAllPodcasts = async (req, res) => {
    try {
        const podcasts = await Podcast.find({ email: req.params.email });
        res.status(200).json(podcasts);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getUserData,
    getAllPodcasts
}