// show the added items
showTask();
loadTodoStates();
// load the checked items

let addTaskInput = document.querySelector("#addTaskInput");
let saveIndex = document.querySelector("#saveIndex");
let addTaskBtn = document.querySelector("#addTaskBtn");
let saveBtn = document.querySelector("#saveTaskBtn");
let deleteAllBtn = document.querySelector("#deleteAllBtn");
let searchTextBox = document.querySelector("#searchTextBox");

// add btn event listener (for create/add items)
addTaskBtn.addEventListener("click", function () {
  // showTask();
  // loadTodoStates();
  //extract value from input
  let addTaskVal = addTaskInput.value;
  //show alert
  let alert = document.querySelector("#alertAdd");
  //make sure user data are not empty
  if (addTaskVal.trim() === "") {
    //(addTaskVal.trim() != 0) & remove else
    alert.style.display = "block";
  } else {
    alert.style.display = "none";
    let getTask = localStorage.getItem("todoTask"); //get value from localStorege (LS) for data add
    //!empty then check LS data are created or not
    if (getTask == null) {
      let taskObj = [];
    } else {
      //if created convert LS-string data to obj data to add new data
      taskObj = JSON.parse(getTask);
    }
    //push new data in obj
    taskObj.push(addTaskVal);

    //save data in LS with converting obj to str
    localStorage.setItem("todoTask", JSON.stringify(taskObj));
  }
  addTaskInput.value = ""; // reset Add Task value
  // both should must here for the display the items, whenever add items
  showTask();
  loadTodoStates();
});

// function that show the all items
function showTask() {
  //get value from LS for data add
  let getTask = localStorage.getItem("todoTask");
  //check, LS data are created or not
  if (getTask == null) {
    taskObj = [];
  } else {
    //if created, convert LS- string to obj {k:v}
    taskObj = JSON.parse(getTask);
  }
  // create for add data and display
  let htmlList = "";

  // for the display the stored(taskObj) items
  taskObj.forEach((element, index) => {
    htmlList += `<div class="task">
    <div class="task-row">
    <p class="text"><span class="taskNum">${index + 1}.</span>${element}</p>
    </div>
    <div class="update-list" onclick="editItem(${index})" style="background-image: url(&quot;../src/assets/update-icon.svg&quot;);"></div>
    <div class="xMark deleteBtn" onclick="deleteItem(${index})" style="background-image: url(&quot;../src/assets/circle-xmark.svg&quot;);"></div>
    </div>`;
  });

  let tasks = document.querySelector(".tasks");
  // add in .taska tag
  tasks.innerHTML = htmlList;
}

//  function for checked task
document.addEventListener("DOMContentLoaded", function () {
  const todoList = document.querySelector(".tasks");
  //add checked items if any checked
  // loadTodoStates();

  //event handler for the, when click on .text elem
  todoList.addEventListener("click", function (e) {
    if (e.target && e.target.matches(".text")) {
      const todoItem = e.target;
      // toggle (if saved then remove, else saved)
      todoItem.classList.toggle("checked");
      // pass arg in fn to save the K:V {item name : true/false the class contains}
      saveTodoState(todoItem.innerText, todoItem.classList.contains("checked"));
    }
  });

  //!! WAP for store checked items to item and checked not in obj k.v
  // function to save checked item in local storage
  function saveTodoState(itemText, isChecked) {
    // remove numbers
    const taskText = itemText.replace(/^[^.]*\.\s*/, "");

    // get value from LS as string convert into Obj,
    // if not saved then create  empty Array using the Truthy & false assignment ||
    let tasks = JSON.parse(localStorage.getItem("todoCheck")) || [];

    // todoItem.innerText  is taskText
    //return value that match (stored value === user clicked value)
    let existingTask = tasks.find((task) => task === taskText);

    // ye if vala q hai idr
    // kya items ko ak bar ke liye save nahi kar sakte, bar bar obj ban raha h new

    //if return then
    if (existingTask) {
      existingTask.checked = isChecked;
    } else {
      tasks.push({ text: taskText, checked: isChecked });
    }

    localStorage.setItem("todoCheck", JSON.stringify(tasks));
  }
});

// load the checked items
function loadTodoStates() {
  // extract from lS
  let getTasks = JSON.parse(localStorage.getItem("todoCheck")) || [];

  // loop on all items of getTasks
  getTasks.forEach((getTask) => {
    //select all .task elem
    const taskElms = document.querySelectorAll(".task");

    // loop on all .task elem
    taskElms.forEach((taskElm) => {
      // select .text elem and extract item names fro html
      const textTag = taskElm.querySelector(".text");
      const taskTextWithNum = textTag.textContent;

      // remove the number from the extracted  text from html
      const taskText = taskTextWithNum.replace(/^[^.]*\.\s*/, "");

      // check if saved text === html text
      if (getTask.text === taskText) {
        // getTask = {text: 'item name', checked: true}
        //when true, target the looped's  all .task elem
        //toggle the checked with value true/false
        taskElm
          .querySelector(".text")
          .classList.toggle("checked", getTask.checked);
        //if this not work then create blank else{}
      }
    });
  });

  let searchTextBox = document.querySelector("#searchTextBox");
  searchTextBox.value = ""; // reset search box on loade
}

document.addEventListener("DOMContentLoaded", function () {
  loadTodoStates();
});

// edit btn function
// <div class="update-list" onclick="editItem(${index})"></div>
function editItem(index) {
  // add index value for saveBtn event listener
  saveIndex.value = index;
  let getTask = localStorage.getItem("todoTask");
  taskObj = JSON.parse(getTask);

  // add clicked item at the Add Task input
  addTaskInput.value = taskObj[index];

  // this uae for toggle b/w the Add btn & Save Btn
  addTaskBtn.style.display = "none";
  saveBtn.style.display = "block";

  // during the edit, we disabled the deleteButton (NodeList)
  let deleteButtons = document.querySelectorAll(".deleteBtn");
  deleteButtons.forEach((btn) => {
    btn.disabled = true; // clicked btn disabled-true-all
    btn.classList.add("disabled"); // add css
  });

  searchTextBox.value = "";
}

// save btn for edit item
saveBtn.addEventListener("click", function () {
  let getTask = localStorage.getItem("todoTask");
  taskObj = JSON.parse(getTask);

  //add edited value to clicked item (index) in Ls after the display
  taskObj[saveIndex.value] = addTaskInput.value;
  localStorage.setItem("todoTask", JSON.stringify(taskObj));

  saveBtn.style.display = "none";
  addTaskBtn.style.display = "block";
  addTaskInput.value = "";
  showTask(); // show the edited item(s)
  loadTodoStates();
});

//!! after the update checked fnt add a some code for when delete item its also delete checked from LS
// delete item btn
// <div class="xMark deleteBtn" onclick="deleteItem(${index})"></div>
function deleteItem(index) {
  // for check the del btn are disabled or not (for using edit btn)
  // deleteButtons (is a NodeList)
  let deleteButtons = document.querySelectorAll(".deleteBtn");
  // convert NodeList to Array(Array.from())
  // for each element(btn) in the array (Array.from(deleteButtons)) until the predicate (btn.disabled) returns a value [true(in edit fn) OR false(out of edit fn)].
  let isAnyDisabled = Array.from(deleteButtons).some((btn) => btn.disabled);

  if (isAnyDisabled) {
    return; // if true delete btn (disable), then return(kind of break/stop function)
  }

  // if condition true then below step stop to execute
  // if delete btn are enable then, work
  // splice (remove using index, with one item)
  taskObj.splice(index, 1);
  localStorage.setItem("todoTask", JSON.stringify(taskObj));
  showTask();
  loadTodoStates();
}

// all items delete btn event handler
deleteAllBtn.addEventListener("click", function () {
  localStorage.removeItem("todoTask"); // remove saved items
  localStorage.removeItem("todoCheck"); // remove checked items
  saveBtn.style.display = "none";
  addTaskBtn.style.display = "block";
  addTaskInput.value = "";
  showTask();
  loadTodoStates();
});

// search item functionally

// Search when input changes
searchTextBox.addEventListener("input", function () {
  searchHandler();
});

// Clear search box when click the search close btn
document.addEventListener("click", function (event) {
  if (event.target.id === "searchClose") {
    searchTextBox.value = ""; // Clear the search box value
    showTask();
    loadTodoStates();
  }
});

// search btn function
function searchHandler() {
  let searchVal = searchTextBox.value.trim().toLowerCase(); // Get lowercase search "text"
  let tasks = document.querySelectorAll(".task"); // Get all task elements

  tasks.forEach((task) => {
    let taskText = task.querySelector(".text").textContent.trim().toLowerCase(); // Get task "text" from html
    // check "text" from html that have searched "text" ?
    if (taskText.includes(searchVal)) {
      task.style.display = "flex"; // Show matching tasks
    } else {
      task.style.display = "none"; // Hide non-matching tasks
    }
  });
}
