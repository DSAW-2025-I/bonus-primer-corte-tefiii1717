function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var task = document.getElementById(data);
    event.target.closest(".task-column").querySelector(".task-list").appendChild(task);
    updateTaskCounts();
}

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    let task = document.createElement("li");
    task.className = "task-item";
    task.setAttribute("draggable", "true");
    task.setAttribute("id", "task-" + Date.now());
    task.ondragstart = drag;

    let taskContent = document.createElement("span");
    taskContent.textContent = taskText;
    
    let editButton = document.createElement("button");
    editButton.textContent = "✏️";
    editButton.onclick = () => editTask(task, taskContent);

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.onclick = () => deleteTask(task);

    task.appendChild(taskContent);
    task.appendChild(editButton);
    task.appendChild(deleteButton);
    
    document.getElementById("notStarted").querySelector(".task-list").appendChild(task);
    taskInput.value = "";
    updateTaskCounts();
}

function editTask(task, taskContent) {
    let newText = prompt("Editar tarea:", taskContent.textContent);
    if (newText !== null && newText.trim() !== "") {
        taskContent.textContent = newText.trim();
    }
}

function deleteTask(task) {
    task.remove();
    updateTaskCounts();
}

function updateTaskCounts() {
    document.getElementById("notStartedCount").textContent = document.getElementById("notStarted").querySelectorAll(".task-item").length;
    document.getElementById("inProgressCount").textContent = document.getElementById("inProgress").querySelectorAll(".task-item").length;
    document.getElementById("completedCount").textContent = document.getElementById("completed").querySelectorAll(".task-item").length;
}
