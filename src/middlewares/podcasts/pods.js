const User = require("../../models/users");
const Podcast = require("../../models/podcasts");

// Get all podcasts
const getAllPodcasts = async (req, res) => {
    try {
        const podcasts = await Podcast.find();
        res.status(200).json(podcasts);
    } catch (error) {
        console.log(error);
    }
}

// Get a podcast by id
const getPodcastByTitle = async (req, res) => {
    try {
        const podcast = await Podcast.findOne({ title: req.params.title });
        res.status(200).json(podcast);
    } catch (error) {
        console.log(error);
    }
}

const getPodcastBySpeaker = async (req, res) => {
    try {
        const podcast = await Podcast.findOne({ speaker: req.params.speaker });
        res.status(200).json(podcast);
    } catch (error) {
        console.log(error);
    }
}

const getPodcastByCategory = async (req, res) => {
    try {
        const podcast = await Podcast.findOne({ category: req.params.category });
        res.status(200).json(podcast);
    } catch (error) {
        console.log(error);
    }
}

const getPodcastByType = async (req, res) => {
    try {
        const podcast = await Podcast.findOne({ type: req.params.type });
        res.status(200).json(podcast);
    } catch (error) {
        console.log(error);
    }
}

const addLike = async (req, res) => {
    try {
        const podcast = await Podcast.findOneAndUpdate({ title: req.params.title }, {
            likes: likes + 1
        });
        res.status(200).json(podcast);
    } catch (error) {
        console.log(error);
    }
}

const removeLike = async (req, res) => {
    try {
        const podcast = await Podcast.findOneAndUpdate({ title: req.params.title }, {
            likes: likes - 1
        });
        res.status(200).json(podcast);
    } catch (error) {
        console.log(error);
    }
}

// Podcast managers
const addPodcast = async (req, res) => {
    const { title, description, category, type, speaker } = req.body;
    try {
        const podcast = new Podcast({
            title,
            description,
            category,
            type,
            speaker
        });
        await podcast.save();
        res.status(201).json(podcast);
    } catch (error) {
        console.log(error);
    }
}

const updatePodcast = async (req, res) => {
    const { title, description, category, type, speaker } = req.body;

    try {
        // Search for the speaker and get the id
        const userID = await User.findOne({ username: speaker });
        // if the speaker is not found, return an error
        if (!userID) return res.status(404).json({ message: "Speaker not found" });
        // if the speaker is found, get the id
        speaker = userID._id;
        // Update the podcast
        const podcast = await Podcast.findOneAndUpdate({ title: req.params.title }, {
            title,
            description,
            category,
            type,
            speaker
        });
        res.status(200).json(podcast);
    } catch (error) {
        console.log(error);
    }
}

const deletePodcast = async (req, res) => {
    try {
        const podcast = await Podcast.findOneAndDelete({ title: req.params.title });
        res.status(200).json(podcast);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllPodcasts,
    getPodcastByTitle,
    getPodcastByAuthor,
    getPodcastByCategory,
    addPodcast,
    updatePodcast,
    deletePodcast
}
