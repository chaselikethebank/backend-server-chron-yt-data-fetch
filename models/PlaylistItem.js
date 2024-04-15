// models/PlaylistItem.js

// Mongoose Schema and Model
const mongoose = require('mongoose');

// Define the schema for the playlist item
const createPlaylistItemSchema = (playlistName) => {
    // Check if the model already exists
    if (mongoose.models[playlistName]) {
        // Return the existing model
        return mongoose.model(playlistName);
    }

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
    }, { collection: playlistName });

    return mongoose.model(playlistName, playlistItemSchema);
};

module.exports = createPlaylistItemSchema;
