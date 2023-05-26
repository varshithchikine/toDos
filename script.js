const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('toDos')
const clear = document.getElementById('clear')

const todos = JSON.parse(localStorage.getItem('toDos'))

if (todos) {
    todos.forEach((toDo) => {
        addtoDo(toDo)
    })
}

clear.addEventListener('click', () => {
    const completed = document.querySelectorAll('.completed');
    completed.forEach((todo) => {
        const parent = todo.parentElement;
        parent.removeChild(todo);
    })
    updateLS();
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    addtoDo()
})

function addtoDo(toDo) {


    let toDoText = input.value

    if (toDo) {
        toDoText = toDo.text
    }

    if (toDoText) {
        const toDoEl = document.createElement('p')
        if (toDo && toDo.completed) {
            toDoEl.classList.add('completed')
        }
        toDoEl.innerText = toDoText;

        toDoEl.addEventListener('click', () => {
            toDoEl.classList.toggle('completed')
            updateLS()
        })

        toDoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault()
            toDoEl.remove()
            updateLS()
        })

        todosUL.appendChild(toDoEl)
        input.value = ''
        updateLS()
    }
}

new Sortable(todosUL, {
    animation: 350,
})

// todosUL.addEventListener('change',()=>{
//   updateLS();
// })

function updateLS() {
    toDosEl = document.querySelectorAll('p')

    const toDos = []

    toDosEl.forEach(toDoEl => {
        toDos.push({
            text: toDoEl.innerText,
            completed: toDoEl.classList.contains('completed')
        })
    })

    localStorage.setItem('toDos', JSON.stringify(toDos))
}