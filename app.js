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
        // Conexión a Supabase (reemplaza con tus credenciales)
        const { createClient } = supabase;
        const supabaseUrl = 'https://tu-url.supabase.co';
        const supabaseKey = 'tu-api-key';
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Buscar multas por cédula
        const { data: multas, error } = await supabase
            .from('multas')
            .select('*')
            .eq('cedula', cedula); // Reemplaza con tu lógica de conexión

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
