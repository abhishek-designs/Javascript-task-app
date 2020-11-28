// Selectors
const taskInput = document.querySelector("#task-input");
const taskInputField = document.querySelector(".task-input-field");
const filterInput = document.querySelector(".task-filter-field");
const clrTaskBtn = document.querySelector(".clear-tasks-btn");
const taskLists = document.querySelector(".task-lists");

// Events function
loadEvents();

function loadEvents() {
  // Task input event to add task
  taskInput.addEventListener("submit", addTask);
  // TaskLists click event to delete the list item through event delegation
  taskLists.addEventListener("click", removeTask);
  // Adding click event on the clr btn
  clrTaskBtn.addEventListener("click", clearTasks);
  // Keyup event in the filter field to filter tasks
  filterInput.addEventListener("keyup", filterTasks);
  // Show the saved tasks when the page loads
  document.addEventListener("DOMContentLoaded", fetchTasks);
}

function addTask(e) {
  // Prevent default behaviour
  e.preventDefault();

  //  Check for the blank field
  if (taskInputField.value === "") {
    // Input is empty, show an alert
    alert("enter something");
  } else {
    // Store the inputted task into the local storage first
    storeTask(taskInputField.value);
    // Create task item
    const taskItem = document.createElement("li");
    // Adding class
    taskItem.className = "task-item";
    // Setting the text inside it
    let taskTxt = document.createTextNode(taskInputField.value);
    taskItem.appendChild(taskTxt);
    // Creating delete btn
    const taskDelBtn = document.createElement("a");
    // Setting attribute
    taskDelBtn.setAttribute("href", "#");
    // Adding class to the btn
    taskDelBtn.className = "delete-task-btn";
    // Adding icon to our btn
    taskDelBtn.innerHTML = '<i class="fa fa-remove"></i>';
    // Adding btn to task item
    taskItem.appendChild(taskDelBtn);
    // Now adding the whole task item into the item list
    taskLists.appendChild(taskItem);
    // Clear the field after the task added successfully
    taskInputField.value = "";
  }
}

function removeTask(e) {
  // Adding functionality to delete btn through event delegation
  if (e.target.classList.contains("delete-task-btn")) {
    // Delete the task item through event bubbling
    e.target.parentElement.remove();

    // Deleting tasks from local storage
    removeFromStorage(e.target.parentElement.textContent);
  }
}

function clearTasks(e) {
  // There are 2 ways to clear all tasks
  // 1st method clear all the task items inside the taskLists through innerHTML, but this is'nt the fast way
  // taskLists.innerHTML = "";

  // 2nd method to clear all the task items inside the tasklists through looping with the help of first child and this is the fast way
  while (taskLists.firstChild) {
    // If there is a first child inside the task list
    taskLists.firstChild.remove();
  }

  // Clear all the tasks from the storage also
  clearFromStorage();
}

function filterTasks(e) {
  // First of all fetching the input value from the filter field to search the task according to that
  // let taskKeyword;
  let taskKeyword = e.target.value.toLowerCase();

  // Accessing each task item, this is event bubbling
  const taskItem = e.target.parentElement.parentElement.nextElementSibling.firstElementChild.querySelectorAll(
    ".task-item"
  );

  // Looping through each task item through forEach
  taskItem.forEach(function (task) {
    // Now checking wether the inputted filter value exists in the tasks
    // Also converting the task item value to lower case so that case sensitivity doesn't occur
    if (task.textContent.toLowerCase().indexOf(taskKeyword) !== -1) {
      // Show the matching results of task items
      task.style.display = "block";
    } else {
      // hide the task items which are not matching
      task.style.display = "none";
    }
  });
}

// Function to store the task into the local storage
function storeTask(task) {
  // Initially checking wether there is some data or not
  let taskContain;
  if (localStorage.length === 0) {
    // There is no data
    taskContain = [];
  } else {
    // Fetch the existing data into the task array through JSON.parse()
    taskContain = JSON.parse(localStorage.getItem("task"));
  }

  // Add the inputed task into the taskContain array
  taskContain.push(task);
  // Now store all the tasks into the local storage through JSON.stringify()
  localStorage.setItem("task", JSON.stringify(taskContain));
  // alert("Task saved");
}

// Function to show the saved tasks when page gets loaded
function fetchTasks(e) {
  // Firstly check wether there is an tasks or not
  let taskContain;
  if (localStorage.length === 0) {
    // There is no data
    taskContain = [];
  } else {
    // There is some data
    taskContain = JSON.parse(localStorage.getItem("task"));
  }

  taskContain.forEach(function (task) {
    // Create task item
    const taskItem = document.createElement("li");
    // Adding class
    taskItem.className = "task-item";
    // Setting the text inside it
    let taskTxt = document.createTextNode(task);
    taskItem.appendChild(taskTxt);
    // Creating delete btn
    const taskDelBtn = document.createElement("a");
    // Setting attribute
    taskDelBtn.setAttribute("href", "#");
    // Adding class to the btn
    taskDelBtn.className = "delete-task-btn";
    // Adding icon to our btn
    taskDelBtn.innerHTML = '<i class="fa fa-remove"></i>';
    // Adding btn to task item
    taskItem.appendChild(taskDelBtn);
    // Now adding the whole task item into the item list
    taskLists.appendChild(taskItem);
    // Clear the field after the task added successfully
  });
}

// Function to remove the task from the local storage also
function removeFromStorage(task) {
  // Firstly check wether there is some task or not in the local storage
  let taskContain;
  if (localStorage.length === 0) {
    taskContain = [];
  } else {
    taskContain = JSON.parse(localStorage.getItem("task"));
  }
  // Now get the removed task's index inside the task array
  const taskIndex = taskContain.indexOf(task);
  // Now remove the task of this index from the storage array
  taskContain.splice(taskIndex, 1);

  // Now store the new array of task into the local storage
  localStorage.setItem("task", JSON.stringify(taskContain));
}

// Function to clear all the tasks from the storage also
function clearFromStorage() {
  // Simply call local Storage clear method
  localStorage.clear();
}
