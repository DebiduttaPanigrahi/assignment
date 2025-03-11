const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const totalTasksElement = document.getElementById("totalTasks");
const completedTasksElement = document.getElementById("completedTasks");

let totalTasks = 0;
let completedTasks = 0;

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    totalTasks++;

    const taskItem = document.createElement("li");
    taskItem.className = "task-item";

    const taskContent = document.createElement("span");
    taskContent.className = "task-content";
    taskContent.textContent = taskText;

    const completeButton = document.createElement("button");
    completeButton.className = "complete-btn";
    completeButton.textContent = "Done";
    completeButton.addEventListener("click", function () {
      if (!taskContent.classList.contains("completed")) {
        taskContent.classList.add("completed");
        completedTasks++;
        completeButton.disabled = true;
        completeButton.style.backgroundColor = "#808080";
      }
      updateStats();
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      taskList.removeChild(taskItem);
      totalTasks--;

      if (taskContent.classList.contains("completed")) {
        completedTasks--;
      }

      updateStats();
      toggleEmptyMessage();
    });

    taskItem.appendChild(taskContent);
    taskItem.appendChild(completeButton);
    taskItem.appendChild(deleteButton);

    taskList.appendChild(taskItem);

    taskInput.value = "";

    toggleEmptyMessage();

    updateStats();

    taskInput.focus();
  }
}

function toggleEmptyMessage() {
  if (taskList.children.length > 0) {
    emptyMessage.style.display = "none";
  } else {
    emptyMessage.style.display = "block";
  }
}

function updateStats() {
  totalTasksElement.textContent = `Total: ${totalTasks}`;
  completedTasksElement.textContent = `Completed: ${completedTasks}`;
}

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

toggleEmptyMessage();
