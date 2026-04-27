const inputs = document.getElementById("taskInput");
const button = document.getElementById("addTaskBtn");
const list = document.getElementById("taskList");

button.addEventListener("click", addTask);

function addTask() {
    const task = inputs.value;
    if (task === "") return;
    const listItem = document.createElement("li");
    listItem.textContent = task;
    list.appendChild(listItem);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
        list.removeChild(listItem);
    });
    listItem.appendChild(deleteBtn);
    list.appendChild(listItem);
    inputs.value = "";

 }