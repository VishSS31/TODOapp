const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const renderTasks = (filter = "all") => {
  taskList.innerHTML = "";
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return filter === "completed" ? task.completed : !task.completed;
  });

  filteredTasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = `task-item ${task.completed ? "completed" : ""}`;
    taskItem.innerHTML = `
    <span>${task.name} - ${task.category} - ${
      task.priority
    } - ${task.dueDate}</span>
    <button onclick="toggleComplete(${index})">${
      task.completed ? "Undo" : "Complete"
    }</button>
    <button onclick="editTask(${index})">Edit</button>
    <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(taskItem);
  });
};

const addTask = (e) => {
  e.preventDefault();
  const task = document.getElementById("task").value;
  const dueDate = document.getElementById("due-date").value;
  const priority = document.getElementById("priority").value;
  const category = document.getElementById("category").value;

  tasks.push({ name: task, dueDate, priority, category, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskForm.reset();
  renderTasks();
};

const toggleComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
};

const editTask = (index) => {
  const task = tasks[index];
  document.getElementById("task").value = task.name;
  document.getElementById("due-date").value = task.dueDate;
  document.getElementById("priority").value = task.priority;
  document.getElementById("category").value = task.category;

  deleteTask(index);
};

const filterTasks = (filter) => {
  renderTasks(filter);
};

taskForm.addEventListener("submit", addTask);
document.addEventListener("DOMContentLoaded", () => renderTasks());
