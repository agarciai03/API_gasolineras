import { getGasolineras } from './gasolineras.js';

//function para cargar los combustibles
export async function cargarCombustibles() {
    const todasLasGasolineras = await getGasolineras();

    const ejemplo = todasLasGasolineras[0];

    // creamos un array para los nombres de combustible
    const combustibles = [];

    for (let clave in ejemplo) {
        if (clave.startsWith("Precio")) {
            const nombre = clave.replace("Precio ", "");
            if (!combustibles.includes(nombre)) {
                combustibles.push(nombre);
            }
        }
    }

    combustibles.sort();

    return combustibles;
}
