import { getGasolineras } from './gasolineras.js';

//function que devuelve la lista de municipios de una provincia
export async function cargarMunicipios(provincia) {
    const todasLasGasolineras = await getGasolineras();

    // creamos un array solo con municipios de la provincia elegida
    const municipiosRepetidos = [];
    todasLasGasolineras.forEach(gasolinera => {
        if (gasolinera.Provincia === provincia) {
            municipiosRepetidos.push(gasolinera.Municipio);
        }
    });

    //creamos un array solo con los municipios unicos
    const municipiosUnicos = [];
    municipiosRepetidos.forEach(municipio => {
        if (!municipiosUnicos.includes(municipio)) {
            municipiosUnicos.push(municipio);
        }
    });

    municipiosUnicos.sort();

    return municipiosUnicos;
}
