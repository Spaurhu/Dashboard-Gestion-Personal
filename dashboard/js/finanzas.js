// Variables globales
let transacciones = []; // Almacena las transacciones realizadas

// Referencias al DOM
const transaccionForm = document.getElementById('transaccion-form');
const descripcionInput = document.getElementById('descripcion');
const montoInput = document.getElementById('monto');
const tipoSelect = document.getElementById('tipo');
const listaTransacciones = document.getElementById('lista-transacciones');
const balanceActual = document.getElementById('balance-actual');

// Escuchar el envío del formulario
transaccionForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Obtener los valores del formulario
    const descripcion = descripcionInput.value.trim();
    const monto = parseFloat(montoInput.value);
    const tipo = tipoSelect.value;

    // Validación básica
    if (descripcion === '' || isNaN(monto) || monto <= 0) {
        alert('Por favor, completa todos los campos con valores válidos.');
        return;
    }

    // Crear una nueva transacción
    const nuevaTransaccion = {
        id: Date.now(),
        descripcion,
        monto,
        tipo,
    };

    // Agregar la transacción a la lista
    transacciones.push(nuevaTransaccion);

    // Actualizar la interfaz
    actualizarLista();
    actualizarBalance();

    // Limpiar el formulario
    transaccionForm.reset();
});

// Función para actualizar la lista de transacciones en la interfaz
function actualizarLista() {
    // Limpiar la lista actual
    listaTransacciones.innerHTML = '';

    // Recorrer y mostrar las transacciones
    transacciones.forEach((transaccion) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="transaccion-info">
                <i class="${transaccion.tipo === 'Ingreso' ? 'fas fa-plus-circle' : 'fas fa-minus-circle'}"></i>
                <span>${transaccion.descripcion} - S/ ${transaccion.monto.toFixed(2)}</span>
            </div>
            <div class="transaccion-botones">
                <button onclick="eliminarTransaccion(${transaccion.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        listaTransacciones.appendChild(li);
    });
}

// Función para actualizar el balance actual
function actualizarBalance() {
    let balance = 0;

    // Calcular el balance
    transacciones.forEach((transaccion) => {
        if (transaccion.tipo === 'Ingreso') {
            balance += transaccion.monto;
        } else if (transaccion.tipo === 'Gasto') {
            balance -= transaccion.monto;
        }
    });

    // Mostrar el balance con dos decimales
    balanceActual.textContent = balance.toFixed(2);
}

// Función para eliminar una transacción
function eliminarTransaccion(id) {
    // Filtrar la lista para excluir la transacción con el ID proporcionado
    transacciones = transacciones.filter((transaccion) => transaccion.id !== id);

    // Actualizar la interfaz
    actualizarLista();
    actualizarBalance();
}