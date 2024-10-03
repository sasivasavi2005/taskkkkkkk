// Get modal elements
const taskModal = document.getElementById("registration");
const registerUserBtn = document.getElementById("register-user-btn");
const closeUserBtn = document.getElementsByClassName("close-user-btn")[0];
const closeBtn = document.getElementsByClassName("close-btn")[0];
const popupMessage = document.getElementById("popup-message");
const pendingTasksList = document.getElementById("pendingtasks");
const completedTasksList = document.getElementById("completedtasks");
const totalTasksDisplay = document.getElementById("total-tasks");
const showPendingBtn = document.getElementById("pending");
const showCompletedBtn = document.getElementById("completed");
const registrationForm = document.getElementById("registration-form");
const themeToggleButton = document.getElementById("theme-toggle");
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    themeToggleButton.textContent = "Switch to Light Mode";
  } else {
    themeToggleButton.textContent = "Switch to Dark Mode";
  }
}
themeToggleButton.addEventListener("click", toggleTheme);

let tasks = [];
function openTaskModal() {
  taskModal.style.display = "block";
}
closeBtn.onclick = function () {
  taskModal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target === taskModal) {
    taskModal.style.display = "none";
  }
  if (event.target === userModal) {
    userModal.style.display = "none";
  }
};
registrationForm.onsubmit = function (event) {
  event.preventDefault();
  const taskName = document.getElementById("task-name").value;
  const taskDescription = document.getElementById("task-description").value;
  const dueDate = document.getElementById("due-date").value;
  const newTask = {
    name: taskName,
    description: taskDescription,
    dueDate: dueDate,
    completed: false,
  };

  tasks.push(newTask);
  updateTaskLists();
  showPopupMessage(`Task "${taskName}" registered successfully!`);
  taskModal.style.display = "none";
  registrationForm.reset();
};
function updateTaskLists() {
  pendingTasksList.innerHTML = "";
  completedTasksList.innerHTML = "";
  totalTasksDisplay.innerText = tasks.length;
  tasks.forEach((task, index) => {
    const taskItem = document.createElement("tr");
    taskItem.innerHTML = `
            <td>${task.name}</td>
            <td>${task.description}</td>
            <td>${task.dueDate}</td>
            <td>
                <button onclick="completeTask(${index})">Complete</button>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </td>
        `;
    if (!task.completed) {
      pendingTasksList.appendChild(taskItem);
    } else {
      completedTasksList.appendChild(taskItem);
    }
  });
  updateProgress();
}
registrationForm.onsubmit = function (event) {
  event.preventDefault();
  const taskName = document.getElementById("task-name").value;
  const taskDescription = document.getElementById("task-description").value;
  const dueDate = document.getElementById("due-date").value;
  const newTask = {
    name: taskName,
    description: taskDescription,
    dueDate: dueDate,
    completed: false,
  };
  tasks.push(newTask);
  updateTaskLists();
  showPopupMessage(`Task "${taskName}" registered successfully!`);
  taskModal.style.display = "none";
  registrationForm.reset();
};
function completeTask(index) {
  tasks[index].completed = true;
  updateTaskLists();
  showPopupMessage(`Task "${tasks[index].name}" marked as completed!`);
}
function editTask(index) {
  const task = tasks[index];
  document.getElementById("task-name").value = task.name;
  document.getElementById("task-description").value = task.description;
  document.getElementById("due-date").value = task.dueDate;
  openTaskModal();
  deleteTask(index);
}
function deleteTask(index) {
  tasks.splice(index, 1);
  updateTaskLists();
  showPopupMessage(`Task deleted successfully!`);
}
function showPopupMessage(message) {
  popupMessage.innerText = message;
  popupMessage.style.display = "block";
  setTimeout(() => {
    popupMessage.style.display = "none";
  }, 3000);
}
showPendingBtn.onclick = function () {
  pendingTasksList.style.display = "table";
  completedTasksList.style.display = "none";
};
showCompletedBtn.onclick = function () {
  completedTasksList.style.display = "table";
  pendingTasksList.style.display = "none";
};
