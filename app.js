import { createClient } from '@supabase/supabase-js';

// Inicializa la conexión a Supabase
const supabaseUrl = 'https://azeczuxaefiqayntkcre.supabase.co'; // URL de tu proyecto
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6ZWN6dXhhZWZpcWF5bnRrY3JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4OTU3ODQsImV4cCI6MjA0MDQ3MTc4NH0.aGV5FJzKC1V-UrPViVaKIE_-dnUESD2CviSn9bjDdLo'; // Reemplaza con tu clave pública (anon key)
const supabase = createClient(supabaseUrl, supabaseKey); // Asegúrate de usar 'createClient' aquí

// Función para buscar multas por cédula
async function buscarMultas() {
    const cedula = document.getElementById('cedula').value;

    if (!cedula) {
        alert('Por favor, ingresa una cédula.');
        return;
    }

    document.getElementById('resultado').innerHTML = 'Buscando multas...';
    document.getElementById('tabla-cuerpo').innerHTML = '';
    document.getElementById('tabla-multas').style.display = 'none';

    try {
        const { data: multas, error } = await supabase
            .from('multas')
            .select(`
                id_multa,
                multa,
                fecha,
                estado,
                proceso_cliente (
                    secretaría,
                    clientes (
                        nombre,
                        cedula
                    )
                )
            `)
            .eq('proceso_cliente.clientes.cedula', cedula);

        if (error) {
            throw error;
        }

        console.log('Datos de multas obtenidos:', multas); // Verifica si recibes datos en la consola.

        if (multas.length > 0) {
            mostrarMultas(multas);
        } else {
            document.getElementById('resultado').innerHTML = 'No se encontraron multas para esta cédula.';
        }
    } catch (error) {
        console.error('Error detallado:', error); // Mostrar el error exacto
        document.getElementById('resultado').innerHTML = `Error al buscar multas. Detalle: ${error.message}`;
    }
}
// Aquí se asegura que buscarMultas esté disponible globalmente
window.buscarMultas = buscarMultas;
function mostrarMultas(multas) {
    const tablaCuerpo = document.getElementById('tabla-cuerpo');
    document.getElementById('tabla-multas').style.display = 'table';

    multas.forEach(multa => {
        const fila = document.createElement('tr');

        const idMulta = document.createElement('td');
        idMulta.textContent = multa.id_multa;

        const estadoMulta = document.createElement('td');
        estadoMulta.textContent = multa.estado;  // Asegúrate de tener la columna 'estado'

        const acciones = document.createElement('td');
        acciones.className = 'actions';

        const botonEditar = document.createElement('button');
        botonEditar.textContent = 'Editar';
        botonEditar.onclick = () => editarMulta(multa.id_multa);

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => eliminarMulta(multa.id_multa);

        acciones.appendChild(botonEditar);
        acciones.appendChild(botonEliminar);

        fila.appendChild(idMulta);
        fila.appendChild(estadoMulta);
        fila.appendChild(acciones);

        tablaCuerpo.appendChild(fila);
    });
}


function editarMulta(id_multa) {
    alert('Editar multa con ID: ' + id_multa);
    // Aquí puedes agregar la lógica para editar la multa
}

function eliminarMulta(id_multa) {
    alert('Eliminar multa con ID: ' + id_multa);
    // Aquí puedes agregar la lógica para eliminar la multa
}
