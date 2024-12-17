const jsonServer = require('json-server');

// Create a server instance
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Load the database
const middlewares = jsonServer.defaults();   // Default middlewares

// Use default middlewares
server.use(middlewares);

// Custom route example (optional)
server.get('/welcome', (req, res) => {
  res.json({ message: 'Welcome to the JSON Server!' });
});

// Use the router
server.use(router);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running at http://localhost:${PORT}`);
});
