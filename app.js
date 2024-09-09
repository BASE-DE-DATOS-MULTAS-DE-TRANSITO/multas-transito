// Inicializa la conexión a Supabase
const supabaseUrl = 'https://azeczuxaefiqayntkcre.supabase.co'; // URL de tu proyecto
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6ZWN6dXhhZWZpcWF5bnRrY3JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4OTU3ODQsImV4cCI6MjA0MDQ3MTc4NH0.aGV5FJzKC1V-UrPViVaKIE_-dnUESD2CviSn9bjDdLo'; // Reemplaza con tu clave pública (anon key)
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

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
        // Realiza un join entre las tablas multas, proceso_cliente y clientes
        const { data: multas, error } = await supabase
            .from('multas')
            .select('*, proceso_cliente(id_cliente, clientes(cedula, nombre))')
            .eq('clientes.cedula', cedula);

        if (error) {
            throw error;
        }

        if (multas.length > 0) {
            mostrarMultas(multas);
        } else {
            document.getElementById('resultado').innerHTML = 'No se encontraron multas para esta cédula.';
        }
    } catch (error) {
        console.error('Error al buscar multas:', error);
        document.getElementById('resultado').innerHTML = 'Error al buscar multas. Intenta de nuevo.';
    }
}

function mostrarMultas(multas) {
    const tablaCuerpo = document.getElementById('tabla-cuerpo');
    document.getElementById('tabla-multas').style.display = 'table';

    multas.forEach(multa => {
        const fila = document.createElement('tr');

        const idMulta = document.createElement('td');
        idMulta.textContent = multa.id_multa;

        const estadoMulta = document.createElement('td');
        estadoMulta.textContent = multa.multa_ganada ? 'Ganada' : 'Pendiente';  // Personaliza el estado

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
