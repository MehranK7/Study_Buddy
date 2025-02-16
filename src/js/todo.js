document.addEventListener('DOMContentLoaded', () => {
  const todoContainer = document.querySelector('.todo-container');
  const toggleBtn = document.querySelector('.toggle-todo-btn');
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.querySelector('.todo-list');
  const tasksLeft = document.querySelector('.tasks-left');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const clearCompletedBtn = document.querySelector('.clear-completed');

  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  let currentFilter = 'all';

  // Toggle todo list visibility
  toggleBtn.addEventListener('click', () => {
    todoContainer.classList.toggle('open');
  });

  // Add new todo
  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
      addTodo(text);
      todoInput.value = '';
      updateLocalStorage();
    }
  });

  function addTodo(text) {
    const todo = {
      id: Date.now(),
      text,
      completed: false
    };
    todos.push(todo);
    renderTodos();
  }

  function renderTodos() {
    const filteredTodos = filterTodos(todos, currentFilter);
    todoList.innerHTML = filteredTodos.map(todo => `
      <div class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
        <div class="todo-checkbox ${todo.completed ? 'checked' : ''}" onclick="toggleTodo(${todo.id})">
          ${todo.completed ? '<i class="fas fa-check"></i>' : ''}
        </div>
        <span class="todo-text">${todo.text}</span>
        <button class="delete-todo" onclick="deleteTodo(${todo.id})">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `).join('');
    
    updateTasksCount();
    updateLocalStorage();
  }

  function toggleTodo(id) {
    todos = todos.map(todo => 
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    );
    renderTodos();
  }

  function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
  }

  function filterTodos(todos, filter) {
    switch(filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderTodos();
    });
  });

  clearCompletedBtn.addEventListener('click', () => {
    todos = todos.filter(todo => !todo.completed);
    renderTodos();
  });

  function updateTasksCount() {
    const activeTasks = todos.filter(todo => !todo.completed).length;
    tasksLeft.textContent = `${activeTasks} task${activeTasks !== 1 ? 's' : ''} remaining`;
  }

  function updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  // Make functions available globally
  window.toggleTodo = toggleTodo;
  window.deleteTodo = deleteTodo;

  // Initial render
  renderTodos();
}); 