

console.log("Estoy en diario.js");

const noteTitleInput = document.querySelector('.new-note input[type="text"]');
const noteDateInput = document.querySelector('.new-note input[type="date"]');
const noteContentTextarea = document.querySelector('.new-note textarea');
const saveNoteButton = document.querySelector('.new-note .btn');
const searchInput = document.querySelector('.search-note input[type="text"]');
const searchButton = document.querySelector('.search-note .btn');
const savedNotesList = document.querySelector('.saved-notes ul');

let notes = [];

function displayNotes(filteredNotes = notes) {
    savedNotesList.innerHTML = ""; 

    filteredNotes.forEach((note, index) => {
        const noteItem = document.createElement('li');
        noteItem.textContent = `${note.title} - ${note.content} - ${note.date}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = "Eliminar";
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => {
            deleteNote(index);
        });

        const editButton = document.createElement('button');
        editButton.textContent = "Editar";
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', () => {
            editNote(index);
        });

        noteItem.appendChild(editButton);
        noteItem.appendChild(deleteButton);

        savedNotesList.appendChild(noteItem);
    });
}

function addNote() {
    const title = noteTitleInput.value.trim();
    const date = noteDateInput.value;
    const content = noteContentTextarea.value.trim();

    if (!title || !date || !content) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    notes.push({ title, date, content });
    displayNotes();

    noteTitleInput.value = "";
    noteDateInput.value = "";
    noteContentTextarea.value = "";
}

function deleteNote(index) {
    notes.splice(index, 1);
    displayNotes();
}

function editNote(index) {
    const note = notes[index];
    noteTitleInput.value = note.title;
    noteDateInput.value = note.date;
    noteContentTextarea.value = note.content;

    deleteNote(index);
}

function searchNotes() {
    const query = searchInput.value.trim().toLowerCase();
    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(query) ||
        note.content.toLowerCase().includes(query)
    );

    displayNotes(filteredNotes);
}

saveNoteButton.addEventListener('click', (event) => {
    event.preventDefault(); 
    addNote();
});

searchButton.addEventListener('click', (event) => {
    event.preventDefault(); 
    searchNotes();
});

displayNotes();


// notes = [
//     { title: "Querido diario", date: "2024-10-15", content: "Hoy no quise hacer la tarea :v" },
//     { title: "Cita médica", date: "2024-10-20", content: "Ir al dentista a las 3 PM" }
// ];
// displayNotes();
