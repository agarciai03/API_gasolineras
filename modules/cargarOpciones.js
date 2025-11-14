import { urlProvincias } from "../utils/constants.js";

export async function cargarProvincias(selectProvincia) {
    //esta funcion la hago para cargar las provincias al abrir la web.
    try {
        const respuesta = await fetch(urlProvincias);
        const data = await respuesta.json();

        //pinta el select con las provincias recibidas.
        selectProvincia.innerHTML = "<option disabled selected>Selecciona provincia</option>";
        data.forEach(provincia => {
            const option = document.createElement('option');
            option.value = provincia.IDPovincia;
            option.textContent = provincia.Provincia;
            selectProvincia.append(option);
        });
    } catch (error) {
        // Si falla la API, lo aviso por consola.
        console.error("Error cargando provincias:", error);
    }
}
