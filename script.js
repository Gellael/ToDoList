const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    let taskValue = inputBox.value.trim();
    if (taskValue === "") {
        alert("Anda harus menulis sesuatu!");
        return;
    }
    let confirmation = confirm(`Apakah Anda yakin ingin menambahkan "${taskValue}" ke dalam daftar?`);
    if (!confirmation) {
        return;
    }

    let li = document.createElement("li");

    let taskText = document.createElement("span");
    taskText.innerText = inputBox.value;

    let editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.classList.add("edit-btn");
    editButton.onclick = function () {
        editTask(li, taskText, editButton);
    };

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "X";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = function () {
        confirmDelete(li);
    };

    li.appendChild(taskText);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    listContainer.appendChild(li);

    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

    
function confirmDelete(li) {
        let confirmation = confirm("Apakah Anda yakin ingin menghapus tugas ini?");
        if (confirmation) {
            li.remove();
            saveData();
        }
    }

function editTask(li, taskText, editButton) {
        let inputField = document.createElement("input");
        inputField.type = "text";
        inputField.value = taskText.innerText;
        inputField.classList.add("edit-input");
    
        let confirmButton = document.createElement("button");
        confirmButton.innerText = "Konfirmasi";
        confirmButton.classList.add("confirm-btn");
    
        confirmButton.onclick = function () {
            let newValue = inputField.value.trim();
            
            if (newValue === "") {
                alert("Tugas tidak boleh kosong!");
                return;
            }
    
            let confirmation = confirm("Apakah Anda yakin ingin menyimpan perubahan ini?");
            if (confirmation) {
                taskText.innerText = newValue;
                li.replaceChild(taskText, inputField);
                li.replaceChild(editButton, confirmButton);
                saveData();
            }
        };
    
        li.replaceChild(inputField, taskText);
        li.replaceChild(confirmButton, editButton);
        inputField.focus();
    }

function showTask() {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
        listContainer.innerHTML = "";
    
        tasks.forEach(text => {
            let li = document.createElement("li");
    
            let taskText = document.createElement("span");
            taskText.innerText = text;
    
            let editButton = document.createElement("button");
            editButton.innerText = "Edit";
            editButton.classList.add("edit-btn");
            editButton.onclick = function () {
                editTask(li, taskText, editButton);
            };
    
            let deleteButton = document.createElement("button");
            deleteButton.innerText = "X";
            deleteButton.classList.add("delete-btn");
            deleteButton.onclick = function () {
                confirmDelete(li);
            };
    
            li.appendChild(taskText);
            li.appendChild(editButton);
            li.appendChild(deleteButton);
            listContainer.appendChild(li);
        });
    showTask();
}



