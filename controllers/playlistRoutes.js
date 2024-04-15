const express = require("express");
const router = express.Router();
const createPlaylistItemModel = require("../models/PlaylistItem");
const limiter = require("../utils/rateLimiter");

// Set CORS headers for all routes
router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Route for fetching data from HARVEST_PLAYLIST collection
router.get("/harvest", limiter, async (req, res) => {
  const HarvestPlaylistModel = createPlaylistItemModel("HARVEST_PLAYLIST");

  try {
    const playlistData = await HarvestPlaylistModel.find();
    res.json(playlistData);
    console.log("/harvest is being hit");
  } catch (error) {
    console.error("Error fetching HARVEST_PLAYLIST data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for fetching data from LOFT_PLAYLIST collection
router.get("/loft", limiter, async (req, res) => {
  const LoftPlaylistModel = createPlaylistItemModel("LOFT_PLAYLIST");

  try {
    const playlistData = await LoftPlaylistModel.find();
    res.json(playlistData);
    console.log("/loft is being hit");
  } catch (error) {
    console.error("Error fetching LOFT_PLAYLIST data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for fetching data from TRADITIONAL_PLAYLIST collection
router.get("/traditional", limiter, async (req, res) => {
  const TraditionalPlaylistModel = createPlaylistItemModel(
    "TRADITIONAL_PLAYLIST"
  );

  try {
    const playlistData = await TraditionalPlaylistModel.find();
    res.json(playlistData);
    console.log("/traditional is being hit");
  } catch (error) {
    console.error("Error fetching TRADITIONAL_PLAYLIST data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route for fetching data from WOODFOREST_PLAYLIST collection
router.get("/woodforest", limiter, async (req, res) => {
  const WoodforestPlaylistModel = createPlaylistItemModel(
    "WOODFOREST_PLAYLIST"
  );

  try {
    const playlistData = await WoodforestPlaylistModel.find();
    res.json(playlistData);
    console.log("/woodforest is being hit");
  } catch (error) {
    console.error("Error fetching WOODFOREST_PLAYLIST data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
