import { getGasolineras } from './gasolineras.js';

// function para devolver la lista de provincias
export async function cargarProvincias() {
    const todasLasGasolineras = await getGasolineras();

    // creamos un array con solo las provincias 
    const provinciasRepetidas = todasLasGasolineras.map(gasolinera => gasolinera.Provincia);
    const provinciasUnicas = [];
    provinciasRepetidas.forEach(provincia => {
        if (!provinciasUnicas.includes(provincia)) {
            provinciasUnicas.push(provincia);
        }
    });

    provinciasUnicas.sort();

    return provinciasUnicas;
}
