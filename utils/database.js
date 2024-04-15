const mongoose = require("mongoose");
const axios = require("axios");
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;


async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

async function fetchAndSavePlaylistData(playlistId, PlaylistModel, YOUTUBE_API_KEY) {
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleString();
    try {
        const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/playlistItems`,
            {
                params: {
                    part: "snippet",
                    maxResults: 10,
                    playlistId: playlistId,
                    key: YOUTUBE_API_KEY,
                },
            }
        );

        const fetchedItems = response.data.items.map((item) => ({
            title: item.snippet.title,
            videoId: item.snippet.resourceId.videoId,
            publishedAt: item.snippet.publishedAt,
            description: item.snippet.description,
            thumbnails: item.snippet.thumbnails,
            channelTitle: item.snippet.channelTitle,
            playlistId: playlistId,
            position: item.snippet.position,
            videoOwnerChannelTitle: item.snippet.videoOwnerChannelTitle,
            videoOwnerChannelId: item.snippet.videoOwnerChannelId,
        }));

        const existingItems = await PlaylistModel.find({}, { _id: 0, videoId: 1 });
        const existingVideoIds = existingItems.map((item) => item.videoId);

        const newItems = fetchedItems.filter((item) => !existingVideoIds.includes(item.videoId));

        if (newItems.length > 0) {
            await PlaylistModel.insertMany(newItems);
            console.log(`New items inserted into MongoDB successfully at: ${formattedTime}`);
        } else {
            console.log(`No new items to insert into MongoDB at: ${formattedTime}`);
        }
    } catch (error) {
        console.error("Error fetching and saving playlist videos:", YOUTUBE_API_KEY ,error.response ? error.response.data : error.message);
    }
}

module.exports = { connectToDatabase, fetchAndSavePlaylistData };  