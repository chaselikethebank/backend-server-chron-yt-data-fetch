const schedule = require("node-schedule");
const createPlaylistItemModel = require("../models/PlaylistItem");
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// Define the schedule for the job
// tuesday after lunch '0 13 * * 2'
// For every day after lunch: '30 13 * * *'
// For every hour: '0 * * * *'
// Monday after lunch 0 13 * * 1
// every min '* * * * *'

function schedulePlaylistJobs(playlists, fetchAndSavePlaylistData, YOUTUBE_API_KEY) {
  for (const playlistId in playlists) {
    const playlistName = playlistId.slice(0, -3);
    const PlaylistModel = createPlaylistItemModel(playlistName);
    const playlistFetchId = playlists[playlistId];

    schedule.scheduleJob('59 13 * * *', async () => {
      try {
        console.log(`Running scheduled job for playlist ${playlistId}`);
        await fetchAndSavePlaylistData(playlistFetchId, PlaylistModel, YOUTUBE_API_KEY);
      } catch (err) {
        console.error("Error in scheduled job:", err);
      }
    });
  }
}

module.exports = schedulePlaylistJobs;
