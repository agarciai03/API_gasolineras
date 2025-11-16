import { urlProvincias, urlMunicipiosParcial, urlCombustiblesParcial } from "../utils/constants.js";

// Para cargar provincias
export async function cargarProvincias(selectProvincia) {
    try {
        const respuesta = await fetch(urlProvincias);
        const data = await respuesta.json();
        selectProvincia.innerHTML = "<option disabled selected>Selecciona provincia</option>";
        (data.ListaProvincias || data).forEach(provincia => {
            let option = document.createElement('option');
            option.value = provincia.IDProvincia;
            option.textContent = provincia.Provincia;
            selectProvincia.append(option);
        });
    } catch (error) {
        console.error("Error cargando provincias:", error);
    }
}

// Para cargar municipios
export async function cargarMunicipios(selectMunicipio, idProvincia) {
    try {
        selectMunicipio.disabled = false;
        const respuesta = await fetch(urlMunicipiosParcial + idProvincia);
        const data = await respuesta.json();
        selectMunicipio.innerHTML = "<option disabled selected>Selecciona municipio</option>";
        (data.ListaMunicipios || data).forEach(municipio => {
            let option = document.createElement('option');
            option.value = municipio.IDMunicipio;
            option.textContent = municipio.Municipio;
            selectMunicipio.append(option);
        });
    } catch (error) {
        console.error("Error cargando municipios:", error);
    }
}

// Para cargar tipos de combustible
export async function cargarCombustibles(selectCombustible) {
    try {
        selectCombustible.innerHTML = "<option disabled selected>Selecciona tipo de combustible</option>";
        const respuesta = await fetch(urlCombustiblesParcial);
        const data = await respuesta.json();
        (data.ListaProductos || data).forEach(combustible => {
            let option = document.createElement('option');
            option.value = combustible.IDProducto;
            option.textContent = combustible.NombreProducto;
            selectCombustible.append(option);
        });
    } catch (error) {
        console.error("Error cargando combustibles:", error);
    }
}
