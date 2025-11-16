import { urlProvincias, urlMunicipiosParcial, urlCombustiblesParcial, urlGasolinerasParcial, urlGasolinerasFechaParcial } from "../utils/constants.js";

// function para pedir las provincias a la API
export async function pedirProvincias() {
    const respuesta = await fetch(urlProvincias);
    const datos = await respuesta.json();
    return datos;
}

//function para pedir municipios según el ID de provincia
export async function pedirMunicipios(idProvincia) {
    const respuesta = await fetch(urlMunicipiosParcial + idProvincia);
    const datos = await respuesta.json();
    return datos;
}

// function para pedir tipos de combustibles
export async function pedirCombustibles() {
    const respuesta = await fetch(urlCombustiblesParcial);
    const datos = await respuesta.json();
    return datos;
}

// function donde pedimos las gasolineras segun provincias y municipios 
export async function pedirGasolineras(idMunicipio, idProducto) {
    const respuesta = await fetch(urlGasolinerasParcial + idMunicipio + "/" + idProducto);
    const datos = await respuesta.json();
    return datos;
}

// function para pedir gasolineras abiertas
export async function pedirGasolinerasPorFecha(fecha, idMunicipio, idProducto) {
    const respuesta = await fetch(urlGasolinerasFechaParcial + fecha + "/" + idMunicipio + "/" + idProducto);
    const datos = await respuesta.json();
    return datos;
}
