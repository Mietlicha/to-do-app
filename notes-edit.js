const noteId = location.hash.substring(1);
let notes = getSavedNotes();
const titleElement = document.querySelector('#note-title');
const bodyElement = document.querySelector('#note-body');
let lastUpdated = document.querySelector('#last-updated');

let note = notes.find(note => note.id === noteId);

if (!note) {
  location.assign(`index.html`);
}

bodyElement.value = note.body;
titleElement.value = note.title;
lastUpdated.textContent = generateLastEdit(note.updatedAt);

titleElement.addEventListener('input', e => {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  lastUpdated.textContent = generateLastEdit(note.updatedAt);
  saveNotes(notes);
});

bodyElement.addEventListener('input', e => {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  lastUpdated.textContent = generateLastEdit(note.updatedAt);
  saveNotes(notes);
});

document.querySelector('#remove-note').addEventListener('click', () => {
  removeNote(note.id);
  saveNotes(notes);
  location.assign(`index.html`);
});

window.addEventListener('storage', e => {
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue);
    note = notes.find(note => note.id === noteId);

    if (!note) {
      location.assign(`index.html`);
    }

    bodyElement.value = note.body;
    titleElement.value = note.title;
    lastUpdated.textContent = generateLastEdit(note.updatedAt);
  }
});
