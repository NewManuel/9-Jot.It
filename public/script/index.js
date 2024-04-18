let noteForm;
let noteTitle;
let noteText;
let saveNoteBtn;
let newNoteBtn;
let noteList;

//Element Selection
//This "if" statment selects various HTML elements from the DOM based on their classes, presumably for interacting with them later.
if (window.location.pathname === '/notes') {
  noteForm = document.querySelector('.note-form');
  noteTitle = document.querySelector('.note-title');
  noteText = document.querySelector('.note-textarea');
  saveNoteBtn = document.querySelector('.save-note');
  newNoteBtn = document.querySelector('.new-note');
  clearBtn = document.querySelector('.clear-btn');
  noteList = document.querySelectorAll('.list-container .list-group');
}
//Functions for Showing and Hiding Elements
//Here defines show and hide functions to control the display of HTML elements by modifying their style.display property.
// Show an element
const show = (elem) => {
  elem.style.display = 'inline';
};

//Hide an element
const hide = (elem) => {
  elem.style.display = 'none';
};

//HTTP Requests
//Below "const" variables define functions for making HTTP requests to interact with a backend API

//activeNote is used to keep track of the note in the textarea
let activeNote = {};

//getNotes - Sends a GET request to retrieve notes from the server.
const getNotes = () =>
  fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

//saveNote - Sends a POST request to save a new note to the server.
const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(note)
  });

//deleteNote - Sends a DELETE request to delete a note from the server.
const deleteNote = (id) =>
  fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });

//Rendering Active Note
//It defines a function renderActiveNote to display the active note in the UI.
const renderActiveNote = () => {
  hide(saveNoteBtn);
  hide(clearBtn);

//Depending on whether there is an active note(activeNote), it shows or hides certain buttons and sets the values of input fields accordingly.
  if (activeNote.id) {
    show(newNoteBtn);
    noteTitle.setAttribute('readonly', true);
    noteText.setAttribute('readonly', true);
    noteTitle.value = activeNote.title;
    noteText.value = activeNote.text;
  } else {
    hide(newNoteBtn);
    noteTitle.removeAttribute('readonly');
    noteText.removeAttribute('readonly');
    noteTitle.value = '';
    noteText.value = '';
  }
};

//Event Handlers
//It defines event handler functions for various user interactions

//handleNoteSave - Handles the click event on the save note button, saving the note and updating the UI.
const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

//handleNoteDelete - Handles the click event on the delete note button, deleting the note and updating the UI.
const handleNoteDelete = (e) => {
//Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const note = e.target;
  const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

  if (activeNote.id === noteId) {
    activeNote = {};
  }
//Deletes the clicked note
  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

//handleNoteView - Handles the click event on a note title, displaying the note in the UI.
const handleNoteView = (e) => {
  e.preventDefault();
  activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
  renderActiveNote();
};

//handleNewNoteView - Handles the click event on the new note button, allowing the user to enter a new note.
const handleNewNoteView = (e) => {
  activeNote = {};
  show(clearBtn);
  renderActiveNote();
};

//handleRenderBtns - Renders appropriate buttons based on the state of the form.
const handleRenderBtns = () => {
  show(clearBtn);
  if (!noteTitle.value.trim() && !noteText.value.trim()) {
    hide(clearBtn);
  } else if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

//Rendering Note List
//This defines a function renderNoteList to render the list of note titles in the UI.
const renderNoteList = async (notes) => {
  //Here it fetches notes from the server, converts the response to JSON, and creates HTML elements to represent each note.
  let jsonNotes = await notes.json();
  if (window.location.pathname === '/notes') {
    noteList.forEach((el) => (el.innerHTML = ''));
  }

  let noteListItems = [];

//Returns HTML element with or without a delete button
  const createLi = (text, delBtn = true) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.addEventListener('click', handleNoteDelete);

      liEl.append(delBtnEl);
    }

    return liEl;
  };

  if (jsonNotes.length === 0) {
    noteListItems.push(createLi('No saved Notes', false));
  }

  jsonNotes.forEach((note) => {
    const li = createLi(note.title);
    li.dataset.note = JSON.stringify(note);

    noteListItems.push(li);
  });

//Depending on the current URL path, it appends the note elements to the appropriate container in the UI.
  if (window.location.pathname === '/notes') {
    noteListItems.forEach((note) => noteList[0].append(note));
  }
};

//Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);

// Event Listeners
// It adds event listeners to various elements to handle user interactions
if (window.location.pathname === '/notes') {
//Click event on the save note button triggers handleNoteSave.
  saveNoteBtn.addEventListener('click', handleNoteSave);
//Click event on the new note button triggers handleNewNoteView.
  newNoteBtn.addEventListener('click', handleNewNoteView);
//Click event on the clear button triggers renderActiveNote.
  clearBtn.addEventListener('click', renderActiveNote);
//Input event on the note form triggers handleRenderBtns.
  noteForm.addEventListener('input', handleRenderBtns);
}

// Initial Rendering
// It calls getAndRenderNotes to fetch and render notes from the server when the page is loaded.
getAndRenderNotes();