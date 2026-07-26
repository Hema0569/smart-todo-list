const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");

const emptyMessage = document.getElementById("emptyMessage");
const todayDate = document.getElementById("todayDate");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Today's Date
const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
};

todayDate.innerText = new Date().toLocaleDateString("en-US", options);

// Load Saved Tasks
displayTasks();

// Add Button
addBtn.addEventListener("click", addTask);

// Enter Key
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// Add Task Function
function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();

    taskInput.value = "";

    displayTasks();
}

// Display Tasks
function displayTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    let completed = 0;

    tasks.forEach((task, index) => {

        if (task.completed) completed++;

        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `

            <span class="task-text">

                ${task.text}

            </span>

            <div class="btn-group">

                <button class="complete-btn">✔</button>

                <button class="edit-btn">✏</button>

                <button class="delete-btn">🗑</button>

            </div>

        `;

        // Complete Button

        li.querySelector(".complete-btn").onclick = function () {

            tasks[index].completed = !tasks[index].completed;

            saveTasks();

            displayTasks();

        };

        // Click Text to Complete

        li.querySelector(".task-text").onclick = function () {

            tasks[index].completed = !tasks[index].completed;

            saveTasks();

            displayTasks();

        };

        // Edit

        li.querySelector(".edit-btn").onclick = function () {

            const updated = prompt("Edit your task", tasks[index].text);

            if (updated !== null && updated.trim() !== "") {

                tasks[index].text = updated.trim();

                saveTasks();

                displayTasks();

            }

        };

        // Delete

        li.querySelector(".delete-btn").onclick = function () {

            if (confirm("Delete this task?")) {

                li.style.opacity = "0";

                li.style.transform = "translateX(100px)";

                setTimeout(() => {

                    tasks.splice(index, 1);

                    saveTasks();

                    displayTasks();

                }, 300);

            }

        };

        taskList.appendChild(li);

    });

    totalTasks.innerText = tasks.length;

    completedTasks.innerText = completed;

}

// Save Tasks
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}