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
// Función para mostrar los valores de un enum
function mostrarValoresEnum(enumerado, nombre) {
    console.log("Valores del enum ".concat(nombre, ":"));
    for (var valor in enumerado) {
        if (isNaN(Number(valor))) {
            console.log("- ".concat(enumerado[valor]));
        }
    }
}
// Mostrar los valores de los enums
mostrarValoresEnum(GeneroPelicula, "GeneroPelicula");
mostrarValoresEnum(PaisPelicula, "PaisPelicula");
