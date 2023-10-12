const toDoForm = document.querySelector("#toDo-form");
const toDoInput = document.querySelector("#toDo-input");
const toDoList = document.querySelector("#toDo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
let oldInputValue;

const saveToDo = (text) => {
    const toDo = document.createElement("div");
    toDo.classList.add("toDo");
    const toDoTitle = document.createElement("h3");
    toDoTitle.innerText = text;
    toDo.appendChild(toDoTitle);
    const finishBtn = document.createElement("button");
    finishBtn.classList.add("finish-toDo");
    finishBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    toDo.appendChild(finishBtn);
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-toDo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    toDo.appendChild(editBtn);
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-toDo");
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    toDo.appendChild(removeBtn);
    toDoList.appendChild(toDo);
    toDoInput.value = "";
    toDoInput.focus();
};

const toggleForms = () => {
    editForm.classList.toggle('hide');
    toDoForm.classList.toggle('hide');
    toDoList.classList.toggle('hide');
};

const updateToDo = (text) => {
    const toDos = document.querySelectorAll(".toDo");
    toDos.forEach((toDo) => {
        let toDoTitle = toDo.querySelector('h3');
        if (toDoTitle.innerText === oldInputValue) {
            toDo.innerHTML = text;
        }
    });
};

toDoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputValue = toDoInput.value;
    if (inputValue) {
        saveToDo(inputValue);
    }
});

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let toDoTitle;
    if (parentEl && parentEl.querySelector('h3')) {
        toDoTitle = parentEl.querySelector("h3").innerText;
    }
    if (targetEl.classList.contains("finish-toDo")) {
        parentEl.classList.toggle("done");
    }
    if (targetEl.classList.contains("edit-toDo")) {
        toggleForms();
        editInput.value = toDoTitle;
        oldInputValue = toDoTitle;
    }
    if (targetEl.classList.contains("remove-toDo")) {
        parentEl.remove();
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();
});

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const editInputValue = editInput.value;
    if (editInputValue) {
        updateToDo(editInputValue);
    }
    toggleForms();
});
