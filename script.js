import { cargarProvincias, cargarMunicipios, cargarCombustibles } from "./modules/cargarOpciones.js";

document.addEventListener('DOMContentLoaded', () => {
    const selectProvincia = document.getElementById('provincia');
    const selectMunicipio = document.getElementById('municipio');
    const selectCombustible = document.getElementById('combustible');

    // Al cargar la página, cargo las provincias
    cargarProvincias(selectProvincia);

    // Cuando selecciono provincia, cargo municipios de esa provincia
    selectProvincia.addEventListener('change', () => {
        cargarMunicipios(selectMunicipio, selectProvincia.value);
        // Limpio y deshabilito los combustibles por si acaso
        selectCombustible.innerHTML = "<option disabled selected>Selecciona tipo de combustible</option>";
        selectCombustible.disabled = true;
    });

    // Cuando selecciono municipio, cargo los combustibles
    selectMunicipio.addEventListener('change', () => {
        cargarCombustibles(selectCombustible);
        selectCombustible.disabled = false;
    });

    selectCombustible.addEventListener('change', () => {
        console.log("Combustible seleccionado:", selectCombustible.value);
    });
});
