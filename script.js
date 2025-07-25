// --- Dark Mode Toggle ---
const toggleBtn = document.getElementById("darkModeToggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  // Save preference to localStorage
  if(document.body.classList.contains("dark-mode")){
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// Load theme on startup
if(localStorage.getItem("theme") === "dark"){
  document.body.classList.add("dark-mode");
}

// --- Task Checklist ---
function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (!taskText) return;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, done: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value = "";
  loadTasks();
}

function loadTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task, idx) => {
    let li = document.createElement("li");

    // Checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.id = "task-" + idx;
    checkbox.addEventListener("change", () => toggleTask(idx));

    // Label
    let label = document.createElement("label");
    label.htmlFor = "task-" + idx;
    label.textContent = task.text;
    if(task.done) label.style.textDecoration = "line-through";

    // Delete button
    let delBtn = document.createElement("button");
    delBtn.textContent = "×";
    delBtn.className = "deleteTask";
    delBtn.title = "Delete task";
    delBtn.addEventListener("click", () => deleteTask(idx));

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(delBtn);

    taskList.appendChild(li);
  });
}

function toggleTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[index].done = !tasks[index].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

// --- Notes ---
function addNote() {
  const note = document.getElementById("noteInput").value.trim();
  if (note) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
    document.getElementById("noteInput").value = "";
    loadNotes();
  }
}

function loadNotes() {
  const notesList = document.getElementById("notesList");
  notesList.innerHTML = "";
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach((note) => {
    let li = document.createElement("li");
    li.textContent = note;
    notesList.appendChild(li);
  });
}

// --- File Upload ---
document.getElementById("fileUpload").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    let fileList = document.getElementById("fileList");
    let li = document.createElement("li");
    li.textContent = file.name;
    fileList.appendChild(li);
  }
});

// --- Alarm ---
let alarmTimeout = null;

function setAlarm() {
  const timeInput = document.getElementById("alarmTime").value;
  if (!timeInput) return;

  const now = new Date();
  const alarmDate = new Date(now.toDateString() + " " + timeInput);

  const diff = alarmDate - now;

  if (diff > 0) {
    clearTimeout(alarmTimeout);
    alarmTimeout = setTimeout(() => {
      alert("⏰ Time's up! Wake up or attend your meeting!");
    }, diff);
    document.getElementById("alarmStatus").textContent = `Alarm set for ${timeInput}`;
  } else {
    document.getElementById("alarmStatus").textContent = "Please pick a future time.";
  }
}

// --- Quote Generator ---
const quotes = [
  "Believe you can and you're halfway there.",
  "You’ve got this. You’re doing amazing.",
  "The only limit is your mind.",
  "Start each day with a grateful heart.",
  "Success is the sum of small efforts repeated daily."
];

function generateQuote() {
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quoteText").textContent = random;
}

// --- Daily Love Note ---
const dailyLoveMessages = [
  "You’re not just a developer, you’re my dream come true 💻💖",
  "Every line of code reminds me of how perfectly you’ve written yourself into my life.",
  "I hope today is as amazing as your smile, nhebek barcha habibi ☀️",
  "When you work, you shine. When you smile, I melt. 🌸",
  "This world is better with you building it, one app, one smile at a time 💞"
];

function showDailyLove() {
  const today = new Date().getDay();
  document.getElementById("dailyLoveText").textContent = dailyLoveMessages[today % dailyLoveMessages.length];
}

// --- Surprise Love Note ---
function showLoveNote() {
  const note = document.getElementById("loveNote");
  const kiss = document.getElementById("kiss");

  note.textContent = "To my Melek 💗 You inspire me every day, and I'm so proud of you. This little app is a piece of my heart, just for you.";
  note.classList.remove("hidden");

  kiss.classList.remove("hidden");
  kiss.style.animation = "none";
  void kiss.offsetWidth; // restart animation
  kiss.style.animation = "pop 0.6s ease";
}

// --- Load all on start ---
loadNotes();
showDailyLove();
loadTasks();
