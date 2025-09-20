const addBtn = document.getElementById('add-btn');
const newTodoInput = document.getElementById('new-todo');
const todoList = document.getElementById('todo-list');

addBtn.addEventListener('click', function() {
    const newTask = newTodoInput.value.trim();
    if (!newTask) return;

    const li = document.createElement('li');
    li.className = "bg-slate-500 p-2 rounded-lg flex justify-between items-center";

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = "mr-2 w-5 h-5";

    const span = document.createElement('span');
    span.textContent = newTask;
    span.className = "flex-1";

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            span.classList.add('line-through', 'text-gray-300');
        } else {
            span.classList.remove('line-through', 'text-gray-300');
        }
    });

    // Append elements properly
    li.appendChild(checkbox);
    li.appendChild(span);
    todoList.appendChild(li);

    newTodoInput.value = '';
});
