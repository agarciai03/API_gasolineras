import { ENDPOINT_GASOLINERAS } from '../utils/constants.js';

// function que carga la lista de gasolineras 
export async function getGasolineras() {
    if (window._datosGasolineras) {
        return window._datosGasolineras;
    }

    const respuesta = await fetch(ENDPOINT_GASOLINERAS);
    const datosJson = await respuesta.json();

    window._datosGasolineras = datosJson.ListaEESSPrecio;
    return window._datosGasolineras;
}

// filtra las gasolineras según lo que haya elegido el usuario
export async function buscarGasolineras({ provincia, municipio, combustible, soloAbiertas }) {
    const todas = await getGasolineras();
    let filtradas = todas;

    // filtramos por provincia
    if (provincia) {
        filtradas = filtradas.filter(gasolinera => gasolinera.Provincia === provincia);
    }

    // filtramos por municipio
    if (municipio) {
        filtradas = filtradas.filter(gasolinera => gasolinera.Municipio === municipio);
    }

    // filtramos por combustible
    if (combustible) {
        filtradas = filtradas.filter(gasolinera => {
            let tiene = false;
            for (let clave in gasolinera) {
                if (clave.toLowerCase().includes(combustible.toLowerCase())) {
                    if (gasolinera[clave] && gasolinera[clave].trim() !== "") {
                            tiene = true;
                        }
                }
            }
            return tiene;
        });
    }

    // filtramos por abiertas
    if (soloAbiertas) {
        filtradas = filtradas.filter(gasolinera => {
            return gasolinera.Horario && gasolinera.Horario.includes('24H');
        });
    }

    return filtradas;
}
