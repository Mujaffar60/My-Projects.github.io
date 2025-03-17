
        const noteList = document.querySelector('.note-list');
        const addNoteBtn = document.querySelector('.add-note-btn');
        const searchBar = document.querySelector('.search-bar');
        const modal = document.getElementById('noteModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalText = document.getElementById('modalText');
        const modalSave = document.getElementById('modalSave');
        const modalCancel = document.getElementById('modalCancel');

        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        let editingNoteIndex = -1;

        function renderNotes() {
            noteList.innerHTML = '';
            notes.forEach((note, index) => {
                const noteDiv = document.createElement('div');
                noteDiv.classList.add('note');
                noteDiv.innerHTML = `
                <div class="note-heading">
                    <h2>${note.title}</h2>
                    </div>
                    <div class="note-content">
                    <p>${note.text}</p>
                    </div>
                    <div class="note-actions">
                        <button class="edit" data-index="${index}">Edit</button>
                        <button class="delete" data-index="${index}">Delete</button>
                    </div>
                `;
                noteList.appendChild(noteDiv);
            });
        }

        function saveNotes() {
            localStorage.setItem('notes', JSON.stringify(notes));
        }

        function openModal(title = '', text = '') {
            modalTitle.value = title;
            modalText.value = text;
            modal.style.display = 'block';
        }

        function closeModal() {
            modal.style.display = 'none';
            editingNoteIndex = -1;
        }

        addNoteBtn.addEventListener('click', () => {
            openModal();
        });

        modalCancel.addEventListener('click', closeModal);

        modalSave.addEventListener('click', () => {
            const title = modalTitle.value;
            const text = modalText.value;
            if (editingNoteIndex === -1) {
                notes.push({ title, text });
            } else {
                notes[editingNoteIndex] = { title, text };
            }
            saveNotes();
            renderNotes();
            closeModal();
        });

        noteList.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('edit')) {
                const index = parseInt(target.dataset.index);
                editingNoteIndex = index;
                openModal(notes[index].title, notes[index].text);
            } else if (target.classList.contains('delete')) {
                const index = parseInt(target.dataset.index);
                notes.splice(index, 1);
                saveNotes();
                renderNotes();
            }
        });

        searchBar.addEventListener('input', () => {
            const searchTerm = searchBar.value.toLowerCase();
            const filteredNotes = notes.filter(note => {
                return note.title.toLowerCase().includes(searchTerm) || note.text.toLowerCase().includes(searchTerm);
            });
            noteList.innerHTML = '';
            filteredNotes.forEach((note, index) => {
                const noteDiv = document.createElement('div');
                noteDiv.classList.add('note');
                noteDiv.innerHTML = `
                   <div class="note-heading">
                    <h2>${note.title}</h2>
                    </div>
                    <div class="note-content">
                    <p>${note.text}</p>
                    </div>
                    <div class="note-actions">
                        <button class="edit" data-index="${notes.indexOf(note)}">Edit</button>
                        <button class="delete" data-index="${notes.indexOf(note)}">Delete</button>
                    </div>
                `;
                noteList.appendChild(noteDiv);
            });
        });

        renderNotes();

       
