import mongoose from "mongoose";

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
        type: String,
        required: true
    },
    likes: Number,
});

export default mongoose.model("Podcast", podcastSchema);