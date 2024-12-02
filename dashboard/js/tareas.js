const taskForm = document.getElementById('task-form');
const taskTitleInput = document.getElementById('task-title');
const taskList = document.getElementById('task-list');

function addTask(event) {
    event.preventDefault();
    const taskTitle = taskTitleInput.value.trim();
    if (taskTitle === '') return;
    const taskItem = createTaskItem(taskTitle);
    taskList.appendChild(taskItem);
    saveTasks();
    taskTitleInput.value = '';
}

function createTaskItem(taskTitle, isCompleted = false) {
    const taskItem = document.createElement('div');
    taskItem.className = `d-flex justify-content-between align-items-center p-2 border rounded mb-2 ${isCompleted ? 'bg-success text-white' : ''}`;
    taskItem.dataset.completed = isCompleted;

    taskItem.innerHTML = `
            <span class="task-title ${isCompleted ? 'text-decoration-line-through' : ''}">${taskTitle}</span>
            <div>
                <button class="btn btn-sm btn-success me-2 btn-complete">${isCompleted ? 'Desmarcar' : 'Completar'}</button>
                <button class="btn btn-sm btn-warning me-2 btn-edit">Editar</button>
                <button class="btn btn-sm btn-danger btn-delete">Eliminar</button>
            </div>
        `;

    const completeButton = taskItem.querySelector('.btn-complete');
    const editButton = taskItem.querySelector('.btn-edit');
    const deleteButton = taskItem.querySelector('.btn-delete');

    completeButton.addEventListener('click', () => {
        const isCompleted = taskItem.dataset.completed === 'true';
        taskItem.dataset.completed = !isCompleted;
        taskItem.classList.toggle('bg-success', !isCompleted);
        taskItem.classList.toggle('text-white', !isCompleted);
        taskItem.querySelector('.task-title').classList.toggle('text-decoration-line-through', !isCompleted);
        completeButton.textContent = isCompleted ? 'Completar' : 'Desmarcar';
        saveTasks();
    });

    editButton.addEventListener('click', () => {
        const newTitle = prompt('Editar tarea:', taskTitle);
        if (newTitle) {
            taskItem.querySelector('.task-title').textContent = newTitle.trim();
            saveTasks();
        }
    });

    deleteButton.addEventListener('click', () => {
        taskItem.remove();
        saveTasks();
    });

    return taskItem;
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list > div').forEach(task => {
        tasks.push({
            title: task.querySelector('.task-title').textContent,
            completed: task.dataset.completed === 'true',
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskItem = createTaskItem(task.title, task.completed);
        taskList.appendChild(taskItem);
    });
}


taskForm.addEventListener('submit', addTask);
document.addEventListener('DOMContentLoaded', loadTasks);