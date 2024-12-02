const reminderDateInput = document.getElementById('reminder-date');
const reminderDescriptionInput = document.getElementById('reminder-description');
const addReminderBtn = document.getElementById('add-reminder-btn');
const remindersContainer = document.getElementById('reminders-container');

function addReminder(date, description) {
    const reminderBox = document.createElement('div');
    reminderBox.classList.add('reminder-box');

    reminderBox.innerHTML = `
        <p><span class="reminder-date">${date}:</span> ${description}</p>
        <div class="reminder-actions">
            <button class="edit-btn">Editar</button>
            <button class="delete-btn">Eliminar</button>
        </div>
    `;

    reminderBox.querySelector('.delete-btn').addEventListener('click', () => {
        remindersContainer.removeChild(reminderBox);
    });

    reminderBox.querySelector('.edit-btn').addEventListener('click', () => {
        reminderDateInput.value = date;
        reminderDescriptionInput.value = description;
        remindersContainer.removeChild(reminderBox);
    });

    remindersContainer.appendChild(reminderBox);
}

addReminderBtn.addEventListener('click', () => {
    const date = reminderDateInput.value;
    const description = reminderDescriptionInput.value;

    if (!date || !description) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    addReminder(date, description);
    reminderDateInput.value = '';
    reminderDescriptionInput.value = '';
});

const initialReminders = [ 
    { date: '2024-11-17', description: 'Comprar ingredientes para la cena.' },
    { date: '2024-11-18', description: 'Terminar el proyecto de programación en Java.' },
    { date: '2024-11-19', description: 'Ir al gimnasio a las 6 pm.' },
    { date: '2024-11-20', description: 'Llamar a los clientes para confirmar los pedidos.' },
];


initialReminders.forEach(reminder => addReminder(reminder.date, reminder.description));