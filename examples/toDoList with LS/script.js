const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoItemsList = document.querySelector('.todo-items');

let todos = [];

// looking for submit event
todoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addTodo(todoInput.value);
});

// add todo to array
function addTodo(item) {
    if (item !== '') {
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };

        todos.push(todo);
        addToLocalStorage(todos);

        todoInput.value = '';
    }
}

// show items from array
function renderTodos(todos) {
    todoItemsList.innerHTML = '';

    todos.forEach(function (item) {
        const checked = item.completed ? 'checked' : null;

        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);

        const divLine = document.createElement('div');
        divLine.setAttribute('class', 'bottom-line');
        divLine.setAttribute('data-key', item.id);


        if (item.completed === true) {
            li.classList.add('checked');
        }

        li.innerHTML = `
        <i class="far fa-check-circle is-done-btn" ${checked}></i>
        <p>${item.name}</p>
        <i class="far fa-trash-alt delete-button"></i>  
        `;

        todoItemsList.append(li);
        todoItemsList.append(divLine);
    });

}

// add to local storage fcn
function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
}

// read from local storage fcn
function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');

    if (reference) {
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}

// switch between checked / not checked value
function toggle(id) {
    todos.forEach(function (item) {
        if (item.id == id) {
            item.completed = !item.completed;
        }
    });

    addToLocalStorage(todos);
}

// delete task
function deleteTodo(id) {
    todos = todos.filter(function (item) {
        return item.id != id;
    });

    addToLocalStorage(todos);
}

// init getting everything from localstorage
getFromLocalStorage();

todoItemsList.addEventListener('click', function (event) {
    if (event.target.classList.contains('is-done-btn')) {
        toggle(event.target.parentElement.getAttribute('data-key'));
    }

    if (event.target.classList.contains('delete-button')) {
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
});