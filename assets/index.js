        const addBtn = document.getElementById('add-btn');
        const newTodoInput = document.getElementById('new-todo');
        const todoList = document.getElementById('todo-list');

        addBtn.addEventListener('click', function() {
            const newTask = newTodoInput.value.trim();
            if (!newTask) return;
            
                const li = document.createElement('li');
                 li.className = "bg-slate-500 p-2 rounded-lg flex justify-between items-center";
                li.textContent = newTask;
                todoList.appendChild(li);
                newTodoInput.value = '';
            
        });

