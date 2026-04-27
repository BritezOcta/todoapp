const inputs = document.getElementById("taskInput");
const button = document.getElementById("addTaskBtn");
const list = document.getElementById("taskList");
const descInput = document.getElementById("descInput");

let tasks = [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        tasks.forEach(task => renderTask(task));
    }
}

function renderTask(task) {
    const li = document.createElement("li");

    li.innerHTML = `
        <div class="task-content">
            <div class="task-title">${task.text}</div>
            <div class="task-desc">${task.description || ""}</div>
        </div>
        <button class="delete-btn">✕</button>
    `;

    // completed state
    if (task.completed) {
        li.classList.add("completed");
    }

    // toggle complete
    li.addEventListener("click", () => {
        task.completed = !task.completed;
        li.classList.toggle("completed");
        saveTasks();
    });

    // delete
    li.querySelector(".delete-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        tasks = tasks.filter(t => t.id !== task.id);
        li.remove();
        saveTasks();
    });

    list.appendChild(li);
}

function addTask() {
    const taskText = inputs.value;
    const taskDesc = descInput.value;

    if (taskText.trim() === "") return;

    const newTask = {
        id: Date.now(),
        text: taskText,
        description: taskDesc,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);

    inputs.value = "";
    descInput.value = "";
}

button.addEventListener("click", addTask);

inputs.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

loadTasks();