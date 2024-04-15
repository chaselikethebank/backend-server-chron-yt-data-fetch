const express = require("express");
const cors = require("cors");
require("dotenv").config();
const schedulePlaylistJobs = require("./utils/playlistScheduler");
const corsOptions = require("./utils/corsOptions");
const {
  connectToDatabase,
  fetchAndSavePlaylistData,
} = require("./utils/database");
const controllers = require("./controllers/index");
const {
  LOFT_PLAYLIST_ID,
  WOODFOREST_PLAYLIST_ID,
  TRADITIONAL_PLAYLIST_ID,
  HARVEST_PLAYLIST_ID,
} = require("./utils/playlistIdConfig");


const app = express();
const port = process.env.PORT || 8000;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

app.use(express.json());
app.use(cors(corsOptions));

connectToDatabase(YOUTUBE_API_KEY)
  .then(() => {
    // Define playlist collection names
    const playlists = {
      LOFT_PLAYLIST_ID,
      WOODFOREST_PLAYLIST_ID,
      TRADITIONAL_PLAYLIST_ID,
      HARVEST_PLAYLIST_ID,
    };

    schedulePlaylistJobs(playlists, fetchAndSavePlaylistData, YOUTUBE_API_KEY);

    // Use the controllers
    app.use("/", controllers);

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
