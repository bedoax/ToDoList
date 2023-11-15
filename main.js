const container = document.querySelector('.container');
const createTask = document.querySelector('#createTask');
const addTaskBtn = document.querySelector('#addTaskBtn');
const deleteAllTasksBtn = document.querySelector('#deleteAllTasksBtn');
const tasksContainer = document.querySelector('.tasksContainer');
let isEditing = false;
let counterId = 0;

// Load tasks from local storage to the page
document.addEventListener('DOMContentLoaded', function () {
  loadTasksFromLocalStorage();
});

addTaskBtn.addEventListener('click', addTask);
deleteAllTasksBtn.addEventListener('click', function () {
  tasksContainer.innerHTML = '';
  let tasks = [];
  localStorage.setItem('tasks', JSON.stringify(tasks));
});

tasksContainer.addEventListener('click', function (event) {
  const target = event.target;
  const taskId = target.closest('.task')?.id;

  if (target.classList.contains('fa-pen-to-square')) {
    const taskElement = document.getElementById(taskId);
    if (!isEditing) {
      editTask(taskElement);
    }
  } else if (target.classList.contains('fa-trash-can')) {
    deleteLocalStorage(taskId);
  }
});

function addTask() {
  let textInput = createTask.value.trim();

  if (textInput !== '') {
    let div = createTaskElement(textInput);
    tasksContainer.appendChild(div);

    saveTaskToLocalStorage(textInput);

    createTask.value = '';
  }
}

function createTaskElement(text) {
  let div = document.createElement('div');
  div.style.display = 'flex';
  div.style.justifyContent = 'space-between';

  let iconTrash = document.createElement('i');
  iconTrash.className = 'fa-solid fa-trash-can';
  iconTrash.style.color = '#777';
  iconTrash.style.cursor = 'pointer';
  iconTrash.style.transition = '0.3s';

  let i = document.createElement('i');
  i.className = 'fas fa-pen-to-square';
  i.style.color = '#777';
  i.style.cursor = 'pointer';
  i.style.transition = '0.3s';

  div.className = 'task';
  div.id = counterId;
  counterId++;
  let textNode = document.createTextNode(text);
  let divIcons = document.createElement('div');
  divIcons.appendChild(i);
  divIcons.appendChild(iconTrash);
  divIcons.className = 'icons';
  div.appendChild(textNode);
  div.appendChild(divIcons);

  return div;
}

function editTask(taskElement) {
  isEditing = true;
  createTask.disabled = true;

  let divClone = document.createElement('div');
  divClone.type = 'text';
  divClone.className = 'popUp';
  divClone.style.background = '#eee';

  let input = document.createElement('input');
  input.type = 'text';
  input.className = 'inputPopUp';

  let saveButton = document.createElement('button');
  saveButton.className = 'buttPopUp';
  saveButton.textContent = 'Save';
  input.value = taskElement.firstChild.nodeValue;

  saveButton.addEventListener('click', function () {
    taskElement.firstChild.nodeValue = input.value;
    isEditing = false;
    createTask.disabled = false;
    divClone.remove();
    updateLocalStorage(taskElement.id);
  });

  divClone.appendChild(input);
  divClone.appendChild(saveButton);
  document.body.appendChild(divClone);
}

// saveTaskToLocalStorage
function saveTaskToLocalStorage(task) {
  let tasks = getTasksFromLocalStorage();
  tasks.push({ id: counterId, text: task });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  let tasks = getTasksFromLocalStorage();
  if (Array.isArray(tasks)) {
    tasks.forEach((task) => {
      let div = createTaskElement(task.text);
      div.id = task.id;
      tasksContainer.appendChild(div);
    });
  }
}

// getTasksFromLocalStorage
function getTasksFromLocalStorage() {
  try {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.log(`error: ${error}`);
    return [];
  }
}

// updateLocalStorage
function updateLocalStorage(id) {
  let tasks = [];
  document.querySelectorAll('.task').forEach((e) => {
    let textNode = e.firstChild;
    if (textNode) {
      tasks.push({ id: id, text: textNode.nodeValue });
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteLocalStorage(task) {
  let tasks = getTasksFromLocalStorage();
  tasks = tasks.filter((e) => e.id != task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  let taskElement = document.getElementById(task);
  if (taskElement) {
    taskElement.remove();
  }
  updateLocalStorage(task);
}

  
    


    
    

  


