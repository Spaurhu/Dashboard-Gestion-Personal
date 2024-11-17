// Selección de elementos del DOM
const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const taskList = document.getElementById('task-list');

// Función para agregar una tarea
function addTask(event) {
    event.preventDefault(); // Evitar que el formulario recargue la página

    const taskTitle = taskTitleInput.value.trim();
    if (taskTitle === '') return; // Validar que no esté vacío

    // Crear el elemento de la tarea
    const taskItem = document.createElement('div');
    taskItem.className = 'd-flex justify-content-between align-items-center p-2 border rounded mb-2';
    taskItem.innerHTML = `
        <span>${taskTitle}</span>
        <button class="btn btn-danger btn-sm">Eliminar</button>
    `;

    // Agregar funcionalidad al botón de eliminar
    const deleteButton = taskItem.querySelector('.btn-danger');
    deleteButton.addEventListener('click', () => {
        taskItem.remove();
        saveTasks(); // Actualizar el Local Storage
    });

    // Agregar la tarea al DOM
    taskList.appendChild(taskItem);

    // Guardar en el Local Storage
    saveTasks();

    // Limpiar el campo de entrada
    taskTitleInput.value = '';
}

// Función para guardar tareas en el Local Storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list div span').forEach(task => {
        tasks.push(task.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para cargar tareas desde el Local Storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskTitle => {
        const taskItem = document.createElement('div');
        taskItem.className = 'd-flex justify-content-between align-items-center p-2 border rounded mb-2';
        taskItem.innerHTML = `
            <span>${taskTitle}</span>
            <button class="btn btn-danger btn-sm">Eliminar</button>
        `;

        // Agregar funcionalidad al botón de eliminar
        const deleteButton = taskItem.querySelector('.btn-danger');
        deleteButton.addEventListener('click', () => {
            taskItem.remove();
            saveTasks(); // Actualizar el Local Storage
        });

        // Agregar la tarea al DOM
        taskList.appendChild(taskItem);
    });
}

// Eventos
taskForm.addEventListener('submit', addTask);

// Cargar tareas al cargar la página
document.addEventListener('DOMContentLoaded', loadTasks);

console.log("Estoy en tareas.js");