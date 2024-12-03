"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Librería readline-sync para interactuar con el usuario
var readline_sync_1 = require("readline-sync");
// Función para generar películas dummy (de ejemplo)
function generarPeliculasDummy(numeroPeliculas) {
    if (numeroPeliculas === void 0) { numeroPeliculas = 6; }
    var peliculas = [];
    // Arreglo con los géneros de películas
    var generosPeliculas = [
        GeneroPelicula.Accion,
        GeneroPelicula.Comedia,
        GeneroPelicula.Drama,
        GeneroPelicula.CienciaFiccion,
        GeneroPelicula.Documental,
        GeneroPelicula.Terror,
    ];
    // Arreglo con los países de origen de películas
    var paisPeliculas = [
        PaisPelicula.EstadosUnidos,
        PaisPelicula.Mexico,
        PaisPelicula.Espana,
        PaisPelicula.Francia,
        PaisPelicula.Japon,
        PaisPelicula.India,
        PaisPelicula.Venezuela,
    ];
    for (var i = 0; i < numeroPeliculas; i++) {
        // Obtener un género y un país aleatorios
        var randomGenero = generosPeliculas[Math.floor(generosPeliculas.length * Math.random())];
        var randomPais = paisPeliculas[Math.floor(paisPeliculas.length * Math.random())];
        peliculas.push({
            titulo: "Pelicula ".concat(i + 1),
            genero: randomGenero,
            pais: randomPais,
        });
    }
    return peliculas;
}
// Función para ordenar películas
// Función para ordenar películas
function ordenarPeliculas(peliculas, criterio) {
    // Verificamos si el criterio de ordenamiento es "titulo"
    if (criterio === "titulo") {
        // Ordenamos las películas extrayendo el número del título
        return peliculas.sort(function (a, b) {
            // Dividimos el título por espacios y tomamos la segunda parte, que es el número
            var numeroA = parseInt(a.titulo.split(" ")[1], 10);
            var numeroB = parseInt(b.titulo.split(" ")[1], 10);
            // Comparamos los números de los títulos para determinar el orden
            return numeroA - numeroB;
        });
    }
    else {
        // Para otros criterios (genero o pais), usamos localeCompare para ordenar alfabéticamente
        return peliculas.sort(function (a, b) { return a[criterio].localeCompare(b[criterio]); });
    }
}
// Función para mostrar las películas
function mostrarPeliculas(peliculas) {
    peliculas.forEach(function (pelicula, index) {
        console.log("".concat(index + 1, ". ").concat(pelicula.titulo, " - G\u00E9nero: ").concat(pelicula.genero, ", Pa\u00EDs: ").concat(pelicula.pais));
    });
}
// Preguntar al usuario cómo quiere ordenar las películas
function preguntarOrdenamiento() {
    var opciones = ["titulo", "genero", "pais"];
    var index = (0, readline_sync_1.keyInSelect)(opciones, "¿Cómo quieres ordenar las películas?");
    return opciones[index];
}
// Preguntar al usuario cuantas peliculas quiere
function preguntarCuantasPeliculas() {
    var cantidad = (0, readline_sync_1.questionInt)("¿Cuantas peliculas quieres?");
    return cantidad;
}
function preguntarSeguir() {
    var seguir = (0, readline_sync_1.question)("¿Quieres seguir? (s/N)");
    return seguir.toLocaleLowerCase() === "s";
}
// Función principal
function main() {
    var seguir = true;
    console.log("Bienvenido al ordenador de películas");
    while (seguir) {
        var numeroDePeliculas = preguntarCuantasPeliculas();
        if (numeroDePeliculas <= 0) {
            console.log("El número de películas debe ser mayor a 0");
            seguir = false;
            break;
        }
        var peliculas = generarPeliculasDummy(numeroDePeliculas);
        var criterioOrdenamiento = preguntarOrdenamiento();
        if (criterioOrdenamiento) {
            var peliculasOrdenadas = ordenarPeliculas(peliculas, criterioOrdenamiento);
            mostrarPeliculas(peliculasOrdenadas);
            console.log("Peliculas ordenadas por " + criterioOrdenamiento);
            // Preguntar al usuario si quiere seguir
            seguir = preguntarSeguir();
        }
        else {
            console.log("No se seleccionó ningún criterio de ordenamiento.");
            seguir = false;
        }
    }
}
// Este código debería de estar en un archivo aparte de index.ts
// Enum para los géneros de películas
var GeneroPelicula;
(function (GeneroPelicula) {
    GeneroPelicula["Accion"] = "Acci\u00F3n";
    GeneroPelicula["Comedia"] = "Comedia";
    GeneroPelicula["Drama"] = "Drama";
    GeneroPelicula["CienciaFiccion"] = "Ciencia Ficci\u00F3n";
    GeneroPelicula["Documental"] = "Documental";
    GeneroPelicula["Terror"] = "Terror";
})(GeneroPelicula || (GeneroPelicula = {}));
// Enum para los países de origen de la película
var PaisPelicula;
(function (PaisPelicula) {
    PaisPelicula["EstadosUnidos"] = "Estados Unidos";
    PaisPelicula["Mexico"] = "M\u00E9xico";
    PaisPelicula["Espana"] = "Espa\u00F1a";
    PaisPelicula["Francia"] = "Francia";
    PaisPelicula["Japon"] = "Jap\u00F3n";
    PaisPelicula["India"] = "India";
    PaisPelicula["Venezuela"] = "Venezuela";
})(PaisPelicula || (PaisPelicula = {}));
// Ejecutar la función principal
main();
