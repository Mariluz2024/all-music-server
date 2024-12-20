# All Music Server

## Introducción
El **All Music Server** es un servicio backend creado con [JSON Server](https://github.com/typicode/json-server). Proporciona una API para la aplicación **All Music**, habilitando funciones como la gestión de playlists, búsqueda de canciones y reproducción de videos.

## Requisitos
- **Node.js** (versión 14.x o posterior)
- **npm** (Node Package Manager)

## Instalación
Sigue los siguientes pasos para configurar el servidor:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Mariluz2024/all-music-server.git
   cd all-music-server
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecución
Inicia el servidor con el siguiente comando:
```bash
npm start
```

Por defecto, el servidor se ejecuta en `http://localhost:3000`. Puedes personalizar el puerto modificando el archivo `index.js` o utilizando variables de entorno.

El servidor proporciona los siguientes endpoints:
- `GET /videos` - Obtener una lista de canciones disponibles.
- `GET /playlists` - Obtener una lista de playlists.
- `POST /playlists/new` - Crear una nueva playlist.
- `PUT /playlist/:id/edit` - Actualizar una playlist existente.
- `DELETE /playlist/:playlistId/remove-song/:songId` - Eliminar una canción de una playlist.

Para más detalles, consulta el [repositorio en GitHub](https://github.com/Mariluz2024/all-music-server).

## Autor
Desarrollado por **Mariluz**. Siéntete libre de explorar, contribuir o reportar problemas en el repositorio del proyecto.

**Perfil de GitHub:** [Mariluz2024](https://github.com/Mariluz2024)
