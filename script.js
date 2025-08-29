const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const progressMessage = document.getElementById("progress-message");
const taskCount = document.getElementById("task-count");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
    updateProgressBar();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
        updateProgressBar();

    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
        updateProgressBar();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    updateProgressBar();
}
showTask();

function updateProgressBar() {
    const tasks = document.querySelectorAll("#list-container li");
    const completed = document.querySelectorAll("#list-container li.checked");
    const progress = (completed.length / tasks.length) * 100 || 0;

    document.getElementById("progress-bar").style.width = progress + "%";

    //  Update task count (new)
    taskCount.textContent = `${completed.length}/${tasks.length} Tasks Completed`;

    // Update motivational message

    if (tasks.length === 0) {
        progressMessage.textContent = "Start adding tasks 🚀";
    } else if (completed.length === tasks.length) {
        progressMessage.textContent = "🎉 Very good! Keep it up!";
    } else if (completed.length >= tasks.length / 2) {
        progressMessage.textContent = "💪 Great going, you’re halfway there!";
    } else {
        progressMessage.textContent = "🔥 Stay focused, you can do it!";
    }

}

updateProgressBar();
