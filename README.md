# Express Playlist API with MongoDB Integration and Rate Limiting

This application serves as an API for managing a playlist. It fetches data from the YouTube API, saves it to MongoDB, and provides endpoints to retrieve the playlist data. Additionally, it implements rate limiting to prevent abuse of the API.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Axios
- CORS
- dotenv
- node-schedule
- express-rate-limit

## Setup

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Create a `.env` file and add the following environment variables:
   - `PORT`: Port number for the Express server.
   - `MONGODB_URI`: MongoDB connection URI.
   - `YOUTUBE_API_KEY`: Your YouTube Data API v3 key.
4. Run the application using `npm start`.

## Functionality

- **Fetching and Saving Playlist Data**: The application fetches playlist data from the YouTube API, processes it, and saves it to MongoDB. It checks for new items and inserts them into the database if they are not already present.

- **Scheduled Data Fetching**: The application schedules a job to fetch playlist data periodically using the node-schedule package. By default, it runs every Tuesday after lunch.

- **Rate Limiting**: The application implements rate limiting using the express-rate-limit middleware. It restricts the number of requests from a single IP address within a specified time window to prevent abuse and ensure fair usage of the API.

- **API Endpoints**:
  - `/fetch-youtube-playlist`: Endpoint to manually trigger fetching and saving of playlist data.
  - `/playlist`: Endpoint to retrieve the playlist data from MongoDB.

