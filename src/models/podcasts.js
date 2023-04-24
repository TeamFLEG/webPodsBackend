const mongoose = require("mongoose");

const podcastSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    category: String,
    type: {
        type: String,
        required: true
    },
    speaker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    likes: Number,
});

module.exports = mongoose.model("Podcast", podcastSchema);