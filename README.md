
# All Music Server

## Introduction
The **All Music Server** is a backend service built with [JSON Server](https://github.com/typicode/json-server). It provides an API for the **All Music** application, enabling features such as playlist management, song search, and video playback.

## Requirements
- **Node.js** (version 14.x or later)
- **npm** (Node Package Manager)

## Installation
Follow the steps below to set up the server:

1. Clone the repository:
   ```bash
   git clone https://github.com/Mariluz2024/all-music-server.git
   cd all-music-server
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Execution
Run the server with the following command:
```bash
npm start
```

By default, the server runs on `http://localhost:3000`. You can customize the port by modifying the `index.js` file or using environment variables.

The server provides endpoints such as:
- `GET /videos` - Retrieve a list of available songs.
- `GET /playlists` - Retrieve a list of playlists.
- `POST /playlists/new` - Create a new playlist.
- `PUT /playlist/:id/edit` - Update an existing playlist.
- `DELETE /playlist/:playlistId/remove-song/:songId` - Remove a song from a playlist.

For additional details, refer to the [GitHub repository](https://github.com/Mariluz2024/all-music-server).

## Author
Developed by **Mariluz**. Feel free to explore, contribute, or raise issues in the project repository.

**GitHub Profile:** [Mariluz2024](https://github.com/Mariluz2024)
