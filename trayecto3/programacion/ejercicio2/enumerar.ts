// Enum para los géneros de películas
enum GeneroPelicula {
	Accion = "Acción",
	Comedia = "Comedia",
	Drama = "Drama",
	CienciaFiccion = "Ciencia Ficción",
	Documental = "Documental",
	Terror = "Terror",
}

// Enum para los países de origen de la película
enum PaisPelicula {
	EstadosUnidos = "Estados Unidos",
	Mexico = "México",
	Espana = "España",
	Francia = "Francia",
	Japon = "Japón",
	India = "India",
	Venezuela = "Venezuela",
}

// Función para mostrar los valores de un enum
function mostrarValoresEnum<T>(enumerado: T, nombre: string): void {
	console.log(`Valores del enum ${nombre}:`);
	// Recorremos el enum para mostrar los valores
	for (const valor in enumerado) {
		// Comprobamos si el valor no es un número
		if (isNaN(Number(valor))) {
			console.log(`- ${enumerado[valor as keyof T]}`);
		}
	}
}

// Mostrar los valores de los enums
mostrarValoresEnum(GeneroPelicula, "GeneroPelicula");
mostrarValoresEnum(PaisPelicula, "PaisPelicula");
