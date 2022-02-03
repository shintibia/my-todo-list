//Selector
const submitForm = document.querySelector('.submit-form')
const submitInput = document.querySelector('.submit-input')
const submitBtn = document.querySelector('#submit-btn')
const todos = document.querySelector('.main__todo-list')
const filterOptions = document.querySelector(".filter-todos");

filterOptions.addEventListener("change", filterTodos);

function filterTodos (e) {
    const todoss = todos.childNodes;
    todoss.forEach(function(todoEl) {
        console.log(todoEl[0])
        if (todoEl.nodeName === "DIV") {
            switch (e.target.value) {
                case "all":
                    todoEl.style.display = "flex";
                    break;

                case "completed":
                    if (todoEl.children[0].classList.contains("completed")) {
                        todoEl.style.display = "flex";
                    } else {
                        todoEl.style.display = "none";
                    }
                    break;

                case "uncompleted":
                    if (todoEl.children[0].classList.contains("completed")) {
                        todoEl.style.display = "none";
                    } else {
                        todoEl.style.display = "flex";
                    }
                    break;
            }
        }
    })
}


submitForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //submitform
    if(!submitInput.value) {
        alert('Please fill out!')
        return;
    }
    const todoContent = document.createElement('div');
    todoContent.classList.add('main__todo');
    todoContent.classList.add('move-in');
    todoContent.classList.add('uncompleted');
    if(todoContent === null) {
        todos.appendChild(todoContent)
    } else {
        const todoContentfirst = document.querySelector ('.main__todo:first-child')
        todos.insertBefore(todoContent, todoContentfirst)
    }
     

    //todolist
    const todo = document.createElement('input');
    todo.type = 'text';
    todo.value = submitInput.value;
    
    const todoBtn = document.createElement('div')
    todoBtn.classList.add('todo-btn')
    const checkBtn = document.createElement('button')
    checkBtn.classList.add('check-btn')
    checkBtn.innerHTML = `<i class="fas fa-check">`
    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete-btn')
    deleteBtn.innerHTML = `<i class="fas fa-times">`
    todoContent.appendChild(todo);
    todoContent.appendChild(todoBtn)
    todoBtn.appendChild(checkBtn)
    todoBtn.appendChild(deleteBtn)

    //save to local
    saveLocalTodos(submitInput.value)
    
    
    submitInput.value = '';
    

    //button
    checkBtn.addEventListener('click', function() {
        todoContent.classList.remove('move-in')
        todoContent.classList.add('completed')
        todo.classList.add('completed')
        todoContent.classList.remove('uncompleted')
        todo.setAttribute('readonly', 'readonly')
        todoBtn.removeChild(checkBtn)
        todos.appendChild(todoContent)
        todo.classList.add('completed')
        todoContent.classList.add('check')
    })

    deleteBtn.addEventListener('click', function() {
        todoContent.classList.remove('check')
        todoContent.classList.add('move-out')
        removeLocalTodos(todoContent)
        setTimeout(function() {
            todos.removeChild(todoContent)
        },400)
    })
})


function saveLocalTodos (todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos))
}

const localtodos = JSON.parse(localStorage.getItem('todos')) //array
// console.log(localtodos)
localtodos.forEach(function(todolocal) {
    
    if(localtodos !== null) {
        const todoContent = document.createElement('div');
        todoContent.classList.add('main__todo');
        todoContent.classList.add('move-in');
        todoContent.classList.add('uncompleted');
        if(todoContent === null) {
            todos.appendChild(todoContent)
        } else {
            const todoContentfirst = document.querySelector ('.main__todo:first-child')
            todos.insertBefore(todoContent, todoContentfirst)
        }
         
    
        //todolist
        const todo = document.createElement('input');
        todo.type = 'text';
        todo.value = todolocal;
        
        const todoBtn = document.createElement('div')
        todoBtn.classList.add('todo-btn')
        const checkBtn = document.createElement('button')
        checkBtn.classList.add('check-btn')
        checkBtn.innerHTML = `<i class="fas fa-check">`
        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete-btn')
        deleteBtn.innerHTML = `<i class="fas fa-times">`
        todoContent.appendChild(todo);
        todoContent.appendChild(todoBtn)
        todoBtn.appendChild(checkBtn)
        todoBtn.appendChild(deleteBtn)

        checkBtn.addEventListener('click', function() {
            todoContent.classList.remove('move-in')
            todoContent.classList.add('completed')
            todo.classList.add('completed')
            todoContent.classList.remove('uncompleted')
            todo.setAttribute('readonly', 'readonly')
            todoBtn.removeChild(checkBtn)
            todos.appendChild(todoContent)
            todo.classList.add('completed')
            todoContent.classList.add('check')
        })
    
        deleteBtn.addEventListener('click', function() {
            todoContent.classList.remove('check')
            todoContent.classList.add('move-out')
            removeLocalTodos(todoContent)
            setTimeout(function() {
                todos.removeChild(todoContent)
            },400)
        })
    }
})

function removeLocalTodos (todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].value;
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos',JSON.stringify(todos))
}

