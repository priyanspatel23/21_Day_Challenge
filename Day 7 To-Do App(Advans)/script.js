let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = -1;
function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function addTask() {
    let text = task.value.trim();
    if (!text) return;
    let newTask = {
        category: category.value,
        text,
        date: date.value || new Date().toISOString(),
        expiry: expiry.value,
        user: user.value,
        created: new Date().toISOString()
    };
    if (editIndex === -1) {
        tasks.push(newTask);
    } else {
        tasks[editIndex] = newTask;
        editIndex = -1;
    }
    task.value = "";
    save();
    render();
}
function editTask(i) {
    let t = tasks[i];
    category.value = t.category;
    task.value = t.text;
    date.value = t.date;
    expiry.value = t.expiry;
    user.value = t.user;
    editIndex = i;
}
function del(i) {
    tasks.splice(i, 1);
    save();
    render();
}
function render() {
    let list = document.getElementById("list");
    list.innerHTML = "";
    if (tasks.length === 0) {
        list.innerHTML = "<p style='color:#64748b'>No Todos.</p>";
        return;
    }
    tasks.forEach((t, i) => {
        let div = document.createElement("div");
        div.className = "task-card";
        div.innerHTML = `
      <div class="card-top">
        <h3>${t.text.toUpperCase()}</h3>
        <span class="badge">${t.category || "Work"}</span>
      </div>
      <div class="card-body">
        <p>Created: ${t.created.slice(0, 16)}</p>
        <p>Expiry date: ${t.expiry || "-"}</p>
        <p>Added by: <b>${t.user || "Unknown"}</b></p>
      </div>
      <div class="card-actions">
        <button class="edit" onclick="editTask(${i})">Edit</button>
        <button class="delete" onclick="del(${i})">Delete</button>
      </div>
    `;
        list.appendChild(div);
    });
}
render();