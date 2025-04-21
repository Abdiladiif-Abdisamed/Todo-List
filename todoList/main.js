const form = document.querySelector(".form")
const todoInput = document.querySelector(".todo-input")
const todoList = document.querySelector(".todo-list")


// xogtii local stroge-ka taalay kusoo bandhig DOm-ka
document.addEventListener("DOMContentLoaded", loadTask);

function loadTask (){

  const tasks= getTaskFromLocalStroge();

  tasks.forEach(task => {
    addTaskToDOM(task)
    
  });
}

form.addEventListener("submit", addTask)

// add task 
function addTask(e){
  e.preventDefault();

    const inputValue = todoInput.value.trim();

    if(inputValue !== ""){

      const task = {
        id: Date.now(),
        text : inputValue,
        completed : false
    
      }
      addTaskToDOM(task);
      addToTaskLocalStroge(task);

      todoInput.value = "";
    }


}

// added task to dom
function addTaskToDOM(task){

  const li = document.createElement("li");
  li.className = 'todo-item';
  li.dataset.id = task;

  li.innerHTML = `

    <input type="checkbox" name="" class="checkbox" ${task.completed ? "checked" : ""}>
            <span class="task">${task.text}</span>
            <button class="edit-btn">Edit</button>
            <button class="edit-delete">Delete</button>

  `

  todoList.appendChild(li);

  attachEventListener(task, li)


}

function attachEventListener(task , li){

  const btnDelete = li.querySelector(".edit-delete")
  const btnEdit = li.querySelector(".edit-btn")
  const checkbox = li.querySelector(".checkbox")


  btnDelete.addEventListener("click",()=>{
    handleDelete(task.id,li)

  });

  btnEdit.addEventListener("click", ()=>{
    handleEdit(task.id, li)
  })

  checkbox.addEventListener("change", ()=>{
    toogleTaskComplete(task.id, li , checkbox.checked);
  })
}

// Complete task

function toogleTaskComplete(taskID, li , isCOmpleted){
  const tasks =  getTaskFromLocalStroge();
  const task = tasks.find(task=> task.id ==  taskID);

  if(task){
    task.completed = isCOmpleted;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    li.classList.toggle("completed", isCOmpleted);
  }
}

// update task

function handleEdit(taskID, li){

  const taskSpan = li.querySelector(".task");

  const newTaskText = prompt("ENTER NEW TASK : ", taskSpan.textContent);

  if(newTaskText !== null && newTaskText.trim()!== ""){
    // update task to localStroge
    updateLocalStroge(taskID,newTaskText);
    // update task to DOM in real time
    taskSpan.textContent = newTaskText;
    
  }

}

    // update task to localStroge
function updateLocalStroge(id, newTaskText){

  const tasks = getTaskFromLocalStroge();
  const task = tasks.find(task => task.id ==id);

  task.text = newTaskText;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Delete TAsk

function handleDelete(id , li){
  let tasks = getTaskFromLocalStroge();
  tasks = tasks.filter(task => task.id != id);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  li.remove();
}

// added task to localstroge
function addToTaskLocalStroge(task){

  const oldTask = getTaskFromLocalStroge()
  oldTask.push(task);

  localStorage.setItem("tasks", JSON.stringify(oldTask));
}

// get task to local stroge

function getTaskFromLocalStroge(){
  const oldTask = JSON.parse(localStorage.getItem("tasks")) || [];
  return oldTask;
}