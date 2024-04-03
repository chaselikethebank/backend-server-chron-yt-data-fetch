// Mongoose Schema and Model
const mongoose = require('mongoose');

// Define the schema for the playlist item
const playlistItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    videoId: {
        type: String,
        required: true,
        unique: true
    },
    publishedAt: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnails: {
        default: {
            url: String,
            width: Number,
            height: Number
        },
        medium: {
            url: String,
            width: Number,
            height: Number
        },
        high: {
            url: String,
            width: Number,
            height: Number
        },
        standard: {
            url: String,
            width: Number,
            height: Number
        },
        maxres: {
            url: String,
            width: Number,
            height: Number
        }
    },
    channelTitle: {
        type: String,
        required: true
    },
    playlistId: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    videoOwnerChannelTitle: {
        type: String,
        required: true
    },
    videoOwnerChannelId: {
        type: String,
        required: true
    }
});

// Define the model for the playlist item schema
const PlaylistItem = mongoose.model('PlaylistItem', playlistItemSchema);

module.exports = PlaylistItem;
