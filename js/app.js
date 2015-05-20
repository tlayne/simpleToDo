var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//New Task List Item
var createNewTaskElement = function (taskString) {
    var listItem = document.createElement("li");
    var checkBox = document.createElement("input"); //checkbox
    var label = document.createElement("label");
    var editInput = document.createElement("input"); //text
    var editButton = document.createElement("button");
    var deleteButton = document.createElement("button");
    
    checkBox.type = "checkbox";
    editInput.type = "text";
    
    editButton.textContent = "Edit";
    editButton.className = "edit";
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete";
    label.textContent = taskString;
    
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
  
    
    return listItem;
};

//Add a new task
var addTask = function () {
    var listItem = createNewTaskElement(taskInput.value);
    if (taskInput.value === "") {
        console.log("what?");
        taskInput.setAttribute("style", "border-color: red;");
    } else {
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.setAttribute("style", "border-color: black;");
    taskInput.value = "";
    }
};


//Edit an existing task
var editTask = function () {
    var listItem = this.parentNode;
    var editInput = listItem.querySelector("input[type=text]");
    var label = listItem.querySelector("label");
    
    var containsClass = listItem.classList.contains("editMode");
    
    if (containsClass) {
        
        label.textContent = editInput.value;
        this.textContent = "Edit";
    } else {
        editInput.value = label.textContent;
        this.textContent = "Save";
    }
    
    
    listItem.classList.toggle("editMode");
    
};


//Delete an existing task
var deleteTask = function () {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    
    ul.removeChild(listItem);
};


//Mark a task as complete
var taskCompleted = function () {
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
        bindTaskEvents(listItem, taskIncomplete);

};


//Mark a task as incomplete
var taskIncomplete = function () {
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};

//Wiring
var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");
    
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
};

var ajaxRequest = function () {
 console.log("Ajax request");   
}

addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


//cycle over incompleteTasksHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
 bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);   
};

for (var i = 0; i < completedTasksHolder.children.length; i++) {
 bindTaskEvents(completedTasksHolder.children[i], taskCompleted);   
};