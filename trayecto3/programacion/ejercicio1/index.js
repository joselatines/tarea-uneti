// Importar librería express para crear el servidor
import express from "express";
// Importar body-parser para manejar datos del formulario
import bodyParser from "body-parser";

// Crear una instancia de la aplicación express
const app = express(); 
// Definir el puerto en el que el servidor escuchará
const port = 3000; 

// Configurar body-parser para manejar datos POST
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para la vista de entrada
app.get("/", (req, res) => {
	// Enviar una página HTML con un formulario para ingresar el animal favorito
	res.send(`
        <html>
            <head>
                <!-- Incluir Tailwind CSS desde un CDN -->
                <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            </head>
            <body class="bg-gray-100 flex items-center justify-center h-screen">
                <!-- Contenedor principal centrado -->
                <div class="bg-white p-8 rounded shadow-md w-1/3">
                    <!-- Título de la página -->
                    <h1 class="text-2xl font-bold mb-4">Animal Favorito</h1>
                    <!-- Formulario para ingresar el animal favorito -->
                    <form action="/show-animal" method="post">
                        <div class="mb-4">
                            <label for="animal" class="block text-gray-700">Ingresa el nombre de tu animal favorito:</label>
                            <!-- Input con validaciones: mínimo 3 caracteres, máximo 20, solo letras -->
                            <input type="text" id="animal" name="animal" required minlength="3" maxlength="20" pattern="[A-Za-z]+" class="mt-1 p-2 border border-gray-300 rounded w-full">
                            <small class="text-gray-500">Solo letras, entre 3 y 20 caracteres.</small>
                        </div>
                        <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Enviar</button>
                    </form>
                </div>
            </body>
        </html>
    `);
});

// Ruta para mostrar el animal favorito
app.post("/show-animal", (req, res) => {
  // Obtener el nombre del animal favorito del formulario (de la request)
	const favoriteAnimal = req.body.animal;

  // Verificar que el nombre tenga entre 3 y 20 caracteres y solo contenga letras
  const isValid = /^[A-Za-z]{3,20}$/.test(favoriteAnimal);

  if (!isValid) {
    // Si no es válido, enviar un mensaje de error
    res.send(`
        <html>
            <head>
                <!-- Incluir Tailwind CSS desde un CDN -->
                <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            </head>
            <body class="bg-gray-100 flex items-center justify-center h-screen">
                <div class="bg-white p-8 rounded shadow-md w-1/3">
                    <h1 class="text-2xl font-bold mb-4">Error</h1>
                    <p class="text-red-500">El nombre del animal debe contener solo letras y tener entre 3 y 20 caracteres.</p>
                    <a href="/" class="text-blue-500 hover:underline mt-4 block">Volver</a>
                </div>
            </body>
        </html>
    `);
    return;
  }

	// Enviar página HTML que muestra el animal favorito
	res.send(`
        <html>
            <head>
                <!-- Incluir Tailwind CSS desde un CDN -->
                <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            </head>
            <body class="bg-gray-100 flex items-center justify-center h-screen">
                <!-- Contenedor principal centrado -->
                <div class="bg-white p-8 rounded shadow-md w-1/3">
                    <!-- Título de la página -->
                    <h1 class="text-2xl font-bold mb-4">Tu Animal Favorito</h1>
                    <!-- Mostrar el nombre del animal favorito -->
                    <p class="text-gray-700">Tu animal favorito es: <strong class="text-blue-500">${favoriteAnimal}</strong></p>
                    <!-- Enlace para volver a la página anterior -->
                    <a href="/" class="text-blue-500 hover:underline mt-4 block">Volver</a>
                </div>
            </body>
        </html>
    `);
});

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
	console.log(`Servidor escuchando en http://localhost:${port}`);
});