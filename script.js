class TaskMaster {
  constructor() {
    this.taskList = document.getElementById("taskList");
    this.taskInput = document.getElementById("taskInput");
    this.addBtn = document.getElementById("addBtn");

    this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    this.init();
  }

  init() {
    this.addBtn.addEventListener("click", () => this.addTask());
    this.taskInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.addTask();
    });

    this.renderTasks();
  }

  addTask() {
    const text = this.taskInput.value.trim();
    if (text === "") return;

    const task = {
      id: Date.now(),
      text: text,
      completed: false,
    };

    this.tasks.unshift(task);
    this.taskInput.value = "";
    this.saveTasks();
    this.renderTasks();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
    this.renderTasks();
  }

  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  renderTasks() {
    this.taskList.innerHTML = "";

    if (this.tasks.length === 0) {
      this.taskList.innerHTML = `
                <div class="empty-state">
                    <h3>🎉 No tasks yet!</h3>
                    <p>Add your first task above to get started 🚀</p>
                </div>
            `;
      return;
    }

    this.tasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = "task-item";
      li.innerHTML = `
                <span class="task-text">${task.text}</span>
                <button class="delete-btn" onclick="taskMaster.deleteTask(${task.id})">×</button>
            `;
      this.taskList.appendChild(li);
    });
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.taskMaster = new TaskMaster();
});
