let taskInput = document.querySelector("#task-input");
let addBtn = document.querySelector(".add-btn");
let taskList = [];
let editID = null;

let taskObj = localStorage.getItem("task");
if(taskObj != null){
    taskList = JSON.parse(taskObj);
}

displayTask();
addBtn.addEventListener("click",addTask);

function addTask(){
    let tasks = taskInput.value;
    if(editID != null){
        taskList.splice(editID,1,{"taskName" : tasks});
        editID = null;
    }else{
        if(!taskInput.value.length == 0) taskList.push({"taskName" : tasks});
    }
    saveTask(taskList);
    taskInput.value = "";
    addBtn.innerText = "Add";
}


function saveTask(taskList){
    let str = JSON.stringify(taskList)
    localStorage.setItem("task",str); 
    displayTask();
}

function displayTask(){
    let taskElem = ``;
    taskList.forEach((elem, index)=>{
        taskElem += `<div class="task">
                <div class="task-tittle">
                    <h3 class="task-id">${index+1}</h3>
                    <h3>${elem.taskName}</h3>
                </div>
                <div class="task-operations" onclick="edit(${index})">
                    <div class="edit-btn btn">
                        <button><i class="fa-solid fa-pen" ></i></button>
                    </div>
                    <div class="delete-btn btn" onclick="deleteTask(${index})">
                        <button><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            </div>`;
        });
    document.querySelector(".task-list").innerHTML = taskElem;
}

function edit(id){
    editID = id;
    taskInput.value = taskList[id].taskName;
    addBtn.innerText = "Edit";
}

function deleteTask(id){
    taskList.splice(id,1);
    saveTask(taskList);
}
