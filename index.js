const jsonServer = require("json-server");

// Create a server instance
const server = jsonServer.create();
const router = jsonServer.router("db.json"); // Load the database
const middlewares = jsonServer.defaults(); // Default middlewares

// Use default middlewares
server.use(middlewares);

server.use(jsonServer.bodyParser);

// Custom route example (optional)
server.get("/welcome", (req, res) => {
  res.json({ message: "Welcome to the JSON Server!" });
});

// Ruta personalizada para obtener una playlist por id con detalles de canciones
server.get("/playlists/:id/details", (req, res) => {
  const { id } = req.params;

  // Leer la base de datos actual
  const db = router.db; // Acceso a los datos
  const playlists = db.get("playlists").value();
  const videos = db.get("videos").value();

  // Encontrar la playlist por id
  const playlist = playlists.find((pl) => pl.id == id);

  if (playlist) {
    // Mapear los IDs de videos a detalles completos
    const songs = playlist.videos
      .map((videoId) => videos.find((video) => video.id === videoId))
      .filter((song) => song); // Eliminar videos no encontrados

    // Responder con el nombre de la playlist y los detalles de canciones
    res.json({
      id: playlist.id,
      name: playlist.name,
      songs: songs,
    });
  } else {
    res.status(404).json({ error: "Playlist no encontrada" });
  }
});

server.delete("/playlist/:playlistId/remove-song/:songId", (req, res) => {
  const { playlistId, songId } = req.params;

  // Obtener la base de datos actual
  const db = router.db; // Acceso a los datos
  const playlists = db.get("playlists").value();

  // Encontrar la playlist por ID
  const playlist = playlists.find((pl) => pl.id == playlistId);

  if (playlist) {
    // Verificar si la canción existe en la playlist
    const songIndex = playlist.videos.indexOf(songId);

    if (songIndex !== -1) {
      // Eliminar la canción del arreglo de videos
      playlist.videos.splice(songIndex, 1);

      // Actualizar la base de datos
      db.get("playlists")
        .find({ id: playlistId })
        .assign({ videos: playlist.videos })
        .write();

      // Responder con la playlist actualizada
      res.json({
        message: "Canción eliminada correctamente",
        playlist: {
          id: playlist.id,
          name: playlist.name,
          videos: playlist.videos,
        },
      });
    } else {
      res.status(404).json({ error: "La canción no existe en la playlist" });
    }
  } else {
    res.status(404).json({ error: "Playlist no encontrada" });
  }
});

server.post("/playlists/new", (req, res) => {
  const { name, videos } = req.body;

  // Validar los datos de entrada
  if (!name || !videos || !Array.isArray(videos)) {
    return res.status(400).json({ error: "Datos de la playlist no válidos" });
  }

  // Leer la base de datos actual
  const db = router.db;
  const playlists = db.get("playlists").value();

  // Generar un nuevo ID para la playlist
  const newId = playlists.length
    ? Math.max(...playlists.map((pl) => pl.id)) + 1
    : 1;

  // Crear la nueva playlist
  const newPlaylist = {
    id: newId,
    name,
    videos,
  };

  // Guardar la nueva playlist en la base de datos
  db.get("playlists").push(newPlaylist).write();

  // Responder con la nueva playlist
  res.status(201).json({
    message: "Playlist creada correctamente",
    playlist: newPlaylist,
  });
});

server.put("/playlist/:id/edit", (req, res) => {
  const { id } = req.params;
  const { name, videos } = req.body;

  // Validate input
  if (!name || !Array.isArray(videos)) {
    return res.status(400).json({ error: "Datos de la playlist no válidos" });
  }

  // Access the current database
  const db = router.db;
  const playlists = db.get("playlists");

  // Find the playlist by ID
  const playlist = playlists.find({ id: parseInt(id) }).value();

  if (!playlist) {
    return res.status(404).json({ error: "Playlist no encontrada" });
  }

  // Update the playlist
  playlists
    .find({ id: parseInt(id) })
    .assign({ name, videos })
    .write();

  // Respond with the updated playlist
  res.json({
    message: "Playlist actualizada correctamente",
    playlist: { id: parseInt(id), name, videos },
  });
});

// Use the router
server.use(router);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running at http://localhost:${PORT}`);
});
