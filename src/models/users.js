const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    podcasts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Podcast'
    }]
});

module.exports = mongoose.model('User', userSchema);