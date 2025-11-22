import { cargarProvincias } from './modules/provincias.js';
import { cargarMunicipios } from './modules/municipios.js';
import { cargarCombustibles } from './modules/combustibles.js';
import { buscarGasolineras } from './modules/gasolineras.js';

// accedemos a todos los elementos del formulario y donde van los resultados
const selectProvincia = document.getElementById('provincia');
const selectMunicipio = document.getElementById('municipio');
const selectCombustible = document.getElementById('combustible');
const chkAbierta = document.getElementById('abierta');
const form = document.getElementById('filtro-gasolineras');
const resultadosDiv = document.getElementById('resultados');

// cuando la pagina carga, rellenamos solo provincias
document.addEventListener('DOMContentLoaded', async () => {
    const provincias = await cargarProvincias();
    provincias.forEach(provincia => {
        const opcion = document.createElement('option');
        opcion.value = provincia;
        opcion.textContent = provincia;
        selectProvincia.appendChild(opcion);
    });
    selectProvincia.disabled = false;
});

// municipio y combustible solo se rellenan al haber elegido una provincia
// si el usuario cambia la provincia, cargamos municipios Y combustibles de nuevo
selectProvincia.addEventListener('change', async (event) => {
    selectMunicipio.innerHTML = '<option value="" disabled selected>Seleccionar</option>';
    selectMunicipio.disabled = true;
    selectCombustible.innerHTML = '<option value="" disabled selected>Seleccionar</option>';
    selectCombustible.disabled = true;

    const provinciaSeleccionada = event.target.value;
    if (provinciaSeleccionada) {
        // cargamos municipios
        const municipios = await cargarMunicipios(provinciaSeleccionada);
        municipios.forEach(municipio => {
            const opcion = document.createElement('option');
            opcion.value = municipio;
            opcion.textContent = municipio;
            selectMunicipio.appendChild(opcion);
        });
        selectMunicipio.disabled = false;

        // cargamos combustibles
        const combustibles = await cargarCombustibles();
        combustibles.forEach(combustible => {
            const opcion = document.createElement('option');
            opcion.value = combustible;
            opcion.textContent = combustible;
            selectCombustible.appendChild(opcion);
        });
        selectCombustible.disabled = false;
    }
});

//mostramos la lista de gasolineras
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    //oculto el container de resultados
    resultadosDiv.hidden = true;
    resultadosDiv.innerHTML = 'Buscando...';

    const provincia = selectProvincia.value;
    const municipio = selectMunicipio.value;
    const combustible = selectCombustible.value;
    const soloAbiertas = chkAbierta.checked;

    const lista = await buscarGasolineras({ provincia, municipio, combustible, soloAbiertas });

    //se muestra cuando hay resultados
    resultadosDiv.hidden = false;

    if (!lista || lista.length === 0) {
        resultadosDiv.innerHTML = 'No se encontraron gasolineras con ese filtro.';
        return;
    }

    resultadosDiv.innerHTML = '';
    // Mostramos cada gasolinera
    lista.forEach(gasolinera => {
        const articulo = document.createElement('article');
        articulo.innerHTML =
            `<strong>${gasolinera.Rótulo}</strong><br>
        Dirección: ${gasolinera.Dirección}, ${gasolinera.Municipio}, ${gasolinera.Provincia}<br>
        Horario: ${gasolinera.Horario || 'Sin horario'}<br>`;
        resultadosDiv.appendChild(articulo);
    });
});