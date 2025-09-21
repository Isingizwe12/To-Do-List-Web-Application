const addBtn = document.getElementById('add-btn');
const newTodoInput = document.getElementById('new-todo');
const todoList = document.getElementById('todo-list');
const completedList = document.getElementById('completed-list');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks
function renderTasks() {
  todoList.innerHTML = '';
  completedList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = "bg-slate-200 p-2 rounded-lg flex justify-between items-center";

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.className = "mr-2 w-5 h-5";

    // Task text (with inline editing)
    const text = document.createElement('span');
    text.textContent = task.text;
    text.className = "flex-1 ml-2 cursor-pointer";
    if (task.completed) {
      text.classList.add('line-through', 'text-gray-400');
    }

    // Double-click to edit
    text.addEventListener('dblclick', () => {
      const inputEdit = document.createElement('input');
      inputEdit.type = 'text';
      inputEdit.value = text.textContent;
      inputEdit.className = "border rounded p-1 flex-1";

      li.replaceChild(inputEdit, text);
      inputEdit.focus();

      inputEdit.addEventListener('blur', () => {
        tasks[index].text = inputEdit.value.trim() || "Untitled Task";
        saveTasks();
        renderTasks();
      });

      inputEdit.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') inputEdit.blur();
      });
    });

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = "Delete";
    delBtn.className = "bg-red-500 text-white px-2 py-1 rounded";
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    // Checkbox change
    checkbox.addEventListener('change', () => {
      tasks[index].completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    // Append
    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(delBtn);

    if (task.completed) {
      completedList.appendChild(li);
    } else {
      todoList.appendChild(li);
    }
  });
}

// Add new task (used by both button and Enter key)
function addTask() {
  const newTask = newTodoInput.value.trim();
  if (!newTask) return;

  tasks.push({ text: newTask, completed: false });
  saveTasks();
  renderTasks();

  newTodoInput.value = '';
}

// Click event for button
addBtn.addEventListener('click', addTask);

// Enter key support
newTodoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

// Initial render
renderTasks();
