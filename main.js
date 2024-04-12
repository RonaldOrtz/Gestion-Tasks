const tasksList = document.querySelector('#tasks-List');
const newTaskInput = document.querySelector('#new-task-input');
const addTaskButton = document.querySelector('#add-task-button');

let tasks = [];
const app = {
    tasks,
    tasksList,
    newTaskInput,
};

function createTask(title, isCompleted = false) {
    return {
        id: Date.now(),
        title,
        isCompleted,
    };
}

function renderTasks() {
    tasksList.innerHTML = '';
    tasks.forEach(task => {
        const li = createTaskElement(task);
        tasksList.appendChild(li);
    });
}


function createTaskElement(task) {
    const taskElement = document.createElement('li');
    taskElement.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'list-group-item');

    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    taskCheckbox.checked = task.isCompleted;

    taskCheckbox.addEventListener('change', () => {
        task.isCompleted = taskCheckbox.checked;
        taskText.classList.toggle("completed", task.isCompleted);
        taskStatusLabel.textContent = task.isCompleted ? "Completado" : "Pendiente";
    });

    const taskText = document.createElement('span');
    taskText.textContent = task.title;
    taskText.classList.toggle("completed", task.isCompleted);

    const taskStatusLabel = document.createElement('span');
    taskStatusLabel.textContent = task.isCompleted ? "Completado" : "Pendiente";

    const editButton = document.createElement('button');
    editButton.textContent = "Editar";
    editButton.classList.add('btn', 'btn-sm', 'btn-primary', 'me-2');
    editButton.addEventListener('click', () => {
        const newTitle = prompt("Editar tarea", task.title);
        if (newTitle !== null && newTitle.trim() !== "") {
            task.title = newTitle.trim();
            taskText.textContent = task.title;
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.classList.add('btn', 'btn-sm', 'btn-danger');
    deleteButton.addEventListener('click', () => {
        deleteTask(task.id);
    });

    taskElement.appendChild(taskCheckbox);
    taskElement.appendChild(taskText);
    taskElement.appendChild(taskStatusLabel);
    taskElement.appendChild(editButton);
    taskElement.appendChild(deleteButton);

    return taskElement;
}


function addTask() {
    const title = newTaskInput.value.trim();
    if (title) {
        const task = createTask(title);
        tasks.push(task);
        newTaskInput.value = '';
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

addTaskButton.addEventListener('click', addTask);

tasksList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const taskId = parseInt(event.target.getAttribute('data-id'));
        deleteTask(taskId);
    }
});

renderTasks();
