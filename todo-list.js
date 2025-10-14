// To-Do List JavaScript Functionality
let todoList = [];

// Load todos from localStorage on page load
function loadTodos() {
    const savedTodos = localStorage.getItem('todoList');
    if (savedTodos) {
        todoList = JSON.parse(savedTodos);
        renderTodoList();
    }
}

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Add a new todo item
function addToDo() {
    const nameInput = document.querySelector('.js-name-input');
    const dueDateInput = document.querySelector('.js-due-date-input');
    
    const name = nameInput.value.trim();
    const dueDate = dueDateInput.value;
    
    // Validation
    if (!name) {
        alert('Please enter a todo name');
        return;
    }
    
    if (!dueDate) {
        alert('Please select a due date');
        return;
    }
    
    // Create todo object
    const todo = {
        id: Date.now(),
        name: name,
        dueDate: dueDate,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    // Add to list
    todoList.push(todo);
    
    // Clear inputs
    nameInput.value = '';
    dueDateInput.value = '';
    
    // Save and render
    saveTodos();
    renderTodoList();
}

// Render the todo list
function renderTodoList() {
    const todoListElement = document.querySelector('.js-todo-list');
    
    if (todoList.length === 0) {
        todoListElement.innerHTML = '<p style="text-align: center; color: #666; margin-top: 20px;">No todos yet. Add one above!</p>';
        return;
    }
    
    todoListElement.innerHTML = todoList.map(todo => `
        <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
            <div class="todo-content">
                <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${todo.id})">
                <span class="todo-name">${escapeHtml(todo.name)}</span>
                <span class="todo-date">Due: ${formatDate(todo.dueDate)}</span>
            </div>
            <div class="todo-actions">
                <button onclick="editTodo(${todo.id})" class="edit-btn">Edit</button>
                <button onclick="deleteTodo(${todo.id})" class="delete-btn">Delete</button>
            </div>
        </div>
    `).join('');
}

// Toggle todo completion status
function toggleTodo(id) {
    const todo = todoList.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodoList();
    }
}

// Delete a todo
function deleteTodo(id) {
    if (confirm('Are you sure you want to delete this todo?')) {
        todoList = todoList.filter(t => t.id !== id);
        saveTodos();
        renderTodoList();
    }
}

// Edit a todo
function editTodo(id) {
    const todo = todoList.find(t => t.id === id);
    if (!todo) return;
    
    const newName = prompt('Edit todo name:', todo.name);
    if (newName !== null && newName.trim() !== '') {
        todo.name = newName.trim();
        saveTodos();
        renderTodoList();
    }
}

// Clear all todos
function clearAllTodos() {
    if (todoList.length === 0) {
        alert('No todos to clear!');
        return;
    }
    
    if (confirm('Are you sure you want to clear all todos? This action cannot be undone.')) {
        todoList = [];
        saveTodos();
        renderTodoList();
    }
}

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Initialize the app when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadTodos();
    
    // Add event listener for Enter key on inputs
    const nameInput = document.querySelector('.js-name-input');
    const dueDateInput = document.querySelector('.js-due-date-input');
    
    if (nameInput) {
        nameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addToDo();
            }
        });
    }
    
    if (dueDateInput) {
        dueDateInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addToDo();
            }
        });
    }
});
