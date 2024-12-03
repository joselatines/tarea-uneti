// Librería readline-sync para interactuar con el usuario
import { keyInSelect, questionInt, question } from "readline-sync";

// Función para generar películas dummy (de ejemplo)
function generarPeliculasDummy(numeroPeliculas: number = 6): Pelicula[] {
	const peliculas: Pelicula[] = [];

	// Arreglo con los géneros de películas
	const generosPeliculas = [
		GeneroPelicula.Accion,
		GeneroPelicula.Comedia,
		GeneroPelicula.Drama,
		GeneroPelicula.CienciaFiccion,
		GeneroPelicula.Documental,
		GeneroPelicula.Terror,
	];

	// Arreglo con los países de origen de películas
	const paisPeliculas = [
		PaisPelicula.EstadosUnidos,
		PaisPelicula.Mexico,
		PaisPelicula.Espana,
		PaisPelicula.Francia,
		PaisPelicula.Japon,
		PaisPelicula.India,
		PaisPelicula.Venezuela,
	];

	for (let i = 0; i < numeroPeliculas; i++) {
		// Obtener un género y un país aleatorios
		const randomGenero =
			generosPeliculas[Math.floor(generosPeliculas.length * Math.random())];
		const randomPais =
			paisPeliculas[Math.floor(paisPeliculas.length * Math.random())];

		peliculas.push({
			titulo: `Pelicula ${i + 1}`,
			genero: randomGenero,
			pais: randomPais,
		});
	}

	return peliculas;
}

// Función para ordenar películas
function ordenarPeliculas(
	peliculas: Pelicula[],
	criterio: keyof Pelicula
): Pelicula[] {
	return peliculas.sort((a, b) => a[criterio].localeCompare(b[criterio]));
}

// Función para mostrar las películas
function mostrarPeliculas(peliculas: Pelicula[]): void {
	peliculas.forEach((pelicula, index) => {
		console.log(
			`${index + 1}. ${pelicula.titulo} - Género: ${pelicula.genero}, País: ${
				pelicula.pais
			}`
		);
	});
}

// Preguntar al usuario cómo quiere ordenar las películas
function preguntarOrdenamiento(): keyof Pelicula {
	const opciones = ["titulo", "genero", "pais"];
	const index = keyInSelect(opciones, "¿Cómo quieres ordenar las películas?");
	return opciones[index] as keyof Pelicula;
}

// Preguntar al usuario cuantas peliculas quiere
function preguntarCuantasPeliculas(): number {
	const cantidad = questionInt("¿Cuantas peliculas quieres?");
	return cantidad;
}

function preguntarSeguir(): boolean {
	const seguir = question("¿Quieres seguir? (s/N)");
	return seguir.toLocaleLowerCase() === "s";
}

// Función principal
function main() {
	let seguir = true;

	console.log("Bienvenido al ordenador de películas");

	while (seguir) {
		const numeroDePeliculas = preguntarCuantasPeliculas();
		if (numeroDePeliculas <= 0) {
			console.log("El número de películas debe ser mayor a 0");
			seguir = false;
			break;
		}

		const peliculas = generarPeliculasDummy(numeroDePeliculas);
		const criterioOrdenamiento = preguntarOrdenamiento();

		if (criterioOrdenamiento) {
			const peliculasOrdenadas = ordenarPeliculas(
				peliculas,
				criterioOrdenamiento
			);
			mostrarPeliculas(peliculasOrdenadas);
      console.log("Peliculas ordenadas por " + criterioOrdenamiento);

			// Preguntar al usuario si quiere seguir
			seguir = preguntarSeguir();
		} else {
			console.log("No se seleccionó ningún criterio de ordenamiento.");
			seguir = false;
		}
	}
}


// Este código debería de estar en un archivo aparte de index.ts 
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

// Interfaz para una película
interface Pelicula {
	titulo: string;
	genero: GeneroPelicula;
	pais: PaisPelicula;
}

// Ejecutar la función principal
main();
