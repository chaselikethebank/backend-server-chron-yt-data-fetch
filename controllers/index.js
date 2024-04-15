const router = require('express').Router();
const playlistRoutes = require('./playlistRoutes'); // Corrected path

router.use('/', playlistRoutes);

module.exports = router;
