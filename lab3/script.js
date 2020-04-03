class Note {
	constructor(title) {
		this.title = title;
		this.element = this.createElement(title);
		// HINT🤩 this.element = this.createElement(title);
	}

	createElement(title) {
		let newNote = document.createElement('div'); //div
		newNote.setAttribute('class', 'card'); //div class card

		let newP = document.createElement('p'); //<p>Todo</p>
		newP.innerHTML = title;

		newNote.appendChild(newP);

		// HINT🤩 a.addEventListener('click', this.remove.bind(newNote));

		return newNote;
	}

	add() {
		// HINT🤩
		// this function should append the note to the screen somehow
		document.querySelector('.notes').appendChild(this.element);
	}

	saveToStorage() {
		// HINT🤩
		// localStorage only supports strings, not arrays
		// if you want to store arrays, look at JSON.parse and JSON.stringify

		let noteToStorage = JSON.parse(localStorage.getItem('todo')) || [];
		noteToStorage.push(this.title);
		localStorage.setItem('todo', JSON.stringify(noteToStorage));
	}

	remove() {
		// HINT🤩 the meaning of 'this' was set by bind() in the createElement function
		// in this function, 'this' will refer to the current note element
		let removeBtn = document.getElementById('btnAddNote');

		removeBtn.onclick = function() {};
	}
}

class App {
	constructor() {
		console.log('👊🏼 The Constructor!');

		// HINT🤩
		// clicking the button should work
		// pressing the enter key should also work
		this.btnAdd = document.querySelector('#btnAddNote');
		this.btnAdd.addEventListener('click', this.createNote.bind(this));
		this.loadNotesFromStorage();
		// this.btnAdd = ???
		// this.btnAdd.addEventListener("click", this.createNote.bind(this));
		// this.loadNotesFromStorage();
	}

	loadNotesFromStorage() {
		// HINT🤩
		// load all notes from storage here and add them to the screen
		// something like note.add() in a loop would be nice
		let storageNotes = JSON.parse(localStorage.getItem('todo')) || [];
		storageNotes.forEach((storageNotes) => {
			let note = new Note(storageNotes);
			note.add();
		});
	}

	createNote(e) {
		// this function should create a new note by using the Note() class
		// HINT🤩
		// note.add();
		let text = document.querySelector('#txtAddNote').value;

		let note = new Note(text);
		note.add();
		note.saveToStorage();
		// this.reset();
	}

	reset() {
		// this function should reset the form
		document.querySelector('form').reset();
	}
}

let app = new App();
