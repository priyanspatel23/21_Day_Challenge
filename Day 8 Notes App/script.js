let notes = JSON.parse(localStorage.getItem("notes")) || [];
function save() {
  localStorage.setItem("notes", JSON.stringify(notes));
}
function addNote() {
  let text = document.getElementById("newNote").value.trim();
  if (!text) return;

  notes.push({
    text,
    pinned: false,
    time: new Date().toLocaleString()
  });

  document.getElementById("newNote").value = "";
  save();
  renderNotes();
}
function deleteNote(i) {
  notes.splice(i, 1);
  save();
  renderNotes();
}
function togglePin(i) {
  notes[i].pinned = !notes[i].pinned;
  save();
  renderNotes();
}
function updateNote(i, val) {
  notes[i].text = val;
  save();
}
function renderNotes() {
  let pinnedDiv = document.getElementById("pinned");
  let notesDiv = document.getElementById("notes");
  let search = document.getElementById("search").value.toLowerCase();

  pinnedDiv.innerHTML = "";
  notesDiv.innerHTML = "";

  notes.forEach((note, i) => {
    if (!note.text.toLowerCase().includes(search)) return;

    let div = document.createElement("div");
    div.className = "note" + (note.pinned ? " pinned" : "");

    div.innerHTML = `
      <textarea oninput="updateNote(${i}, this.value)">${note.text}</textarea>
      <div class="time">${note.time}</div>
      <div class="actions">
        <span class="pin" onclick="togglePin(${i})">📌</span>
        <button onclick="deleteNote(${i})">❌</button>
      </div>
    `;
    if (note.pinned) {
      pinnedDiv.appendChild(div);
    } else {
      notesDiv.appendChild(div);
    }
  });
}
function toggleDark() {
  document.body.classList.toggle("dark");
}

renderNotes();