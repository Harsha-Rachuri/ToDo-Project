let todoInput = document.getElementById("todo-input");
let addTaskButton = document.getElementById("add-task-btn");
let todoList = document.getElementById("todo-list");

// Use the correct key for local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render existing tasks
tasks.forEach((task) => {
    renderTask(task);    
});

// Add task button event listener
addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    tasks.push(newTask);
    saveTasks();
    renderTask(newTask); // Render the new task
    todoInput.value = ""; // Clear input
    console.log(tasks);
});

// Function to save tasks to local storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to render a task
function renderTask(task) {
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    li.innerHTML = `
        <span>${task.text}</span>
        <button class="delete-task-btn">Delete Task</button>`;
    todoList.appendChild(li);

    // Add event listener for the delete button
    li.querySelector('.delete-task-btn').addEventListener('click', () => {
        deleteTask(task.id);
    });
}

// Function to delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId); // Remove the task from the array
    saveTasks(); // Update local storage
    renderTodoList(); // Re-render the task list
}

// Function to re-render the entire task list
function renderTodoList() {
    todoList.innerHTML = ""; // Clear the current list
    tasks.forEach(task => renderTask(task)); // Render all tasks
}
