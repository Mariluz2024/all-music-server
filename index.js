const jsonServer = require("json-server");

// Create a server instance
const server = jsonServer.create();
const router = jsonServer.router("db.json"); // Load the database
const middlewares = jsonServer.defaults(); // Default middlewares

// Use default middlewares
server.use(middlewares);

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

// Use the router
server.use(router);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running at http://localhost:${PORT}`);
});
