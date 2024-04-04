const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const PlaylistItem = require("./models/PlaylistItem");
const schedule = require("node-schedule");

const app = express();
const port = process.env.PORT || 8000;
const PLAYLIST_ID = "PLgE8B1SdCTDvc8Ogp6Lced5yCf7x9-JJB";
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// Middleware
const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(express.json());
app.use(cors(corsOptions));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });

    // Define a function to fetch data from YouTube API and save to MongoDB
    async function fetchAndSavePlaylistData() {
        try {
          // Fetch data from YouTube API
          const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/playlistItems`,
            {
              params: {
                part: "snippet",
                maxResults: 15,
                playlistId: PLAYLIST_ID,
                key: YOUTUBE_API_KEY,
              },
            }
          );
      
          // Extract relevant data from the API response
          const fetchedItems = response.data.items.map((item) => ({
            title: item.snippet.title,
            videoId: item.snippet.resourceId.videoId,
            publishedAt: item.snippet.publishedAt,
            description: item.snippet.description,
            thumbnails: item.snippet.thumbnails,
            channelTitle: item.snippet.channelTitle,
            playlistId: item.snippet.playlistId,
            position: item.snippet.position,
            videoOwnerChannelTitle: item.snippet.videoOwnerChannelTitle,
            videoOwnerChannelId: item.snippet.videoOwnerChannelId,
          }));
      
          // Retrieve existing items from MongoDB
          const existingItems = await PlaylistItem.find({}, { _id: 0, videoId: 1 });
          const existingVideoIds = existingItems.map((item) => item.videoId);
      
          // Filter out new items
          const newItems = fetchedItems.filter(
            (item) => !existingVideoIds.includes(item.videoId)
          );
      
          // Insert new items to MongoDB
          if (newItems.length > 0) {
            await PlaylistItem.insertMany(newItems);
            const currentTime = new Date();
            const formattedTime = currentTime.toLocaleString();
            console.log(
              `New items inserted into MongoDB successfully at: ${formattedTime}`
            );
          } else {
            console.log("No new items to insert into MongoDB");
          }
        } catch (error) {
          console.error(
            "Error fetching and saving playlist videos:",
            error.response ? error.response.data : error.message
          );
        }
      }
      

    // Define the schedule for the job
    schedule.scheduleJob('0 13 * * 2', async () => {
      // Run every minute
      console.log("Running scheduled job to fetch YouTube playlist data...");
      await fetchAndSavePlaylistData();
    });

    // Route for fetching YouTube playlist data and saving to MongoDB
    app.get("/fetch-youtube-playlist", async (req, res) => {
      console.log("Fetching YouTube playlist data...");
      await fetchAndSavePlaylistData();
      res.send("YouTube playlist data fetched and saved to MongoDB");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// API Endpoint for fetching playlist data from MongoDB
app.get("/playlist", async (req, res) => {
  try {
    const playlistData = await PlaylistItem.find();
    res.json(playlistData);
    console.log(`${port} /playlist is being hit`);
  } catch (error) {
    console.error("Error fetching playlist data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
