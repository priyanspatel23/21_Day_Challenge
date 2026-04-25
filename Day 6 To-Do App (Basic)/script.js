let tasks;
if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
} else {
    tasks = [
        { text: "Check emails", done: false },
        { text: "Team meeting at 11 AM", done: false },
        { text: "Prepare project report", done: false },
        { text: "Call client", done: false }
    ];
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
localStorage.clear();

function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function add() {
    let input = document.getElementById("task");
    if (input.value.trim() === "") return;

    tasks.push({ text: input.value, done: false });
    input.value = "";
    save();
    render();
}

function toggle(i) {
    tasks[i].done = !tasks[i].done;
    save();
    render();
}

function removeTask(i) {
    tasks.splice(i, 1);
    save();
    render();
}

function render() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    tasks.forEach((t, i) => {
        let li = document.createElement("li");

        li.innerHTML = `
      <div class="left">
        <input type="checkbox" ${t.done ? "checked" : ""} onclick="toggle(${i})">
        <span class="${t.done ? "done" : ""}">${t.text}</span>
      </div>
      <button class="del" onclick="removeTask(${i})">X</button>
    `;

        list.appendChild(li);
    });
}

render();