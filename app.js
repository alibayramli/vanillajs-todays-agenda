const input = document.querySelector(".input");
const button = document.querySelector(".button");
const list = document.querySelector(".list");
const filter = document.querySelector('.filter-list');
const filterInfo = document.querySelector('.filtered-list');
document.addEventListener("DOMContentLoaded", getListsFromLocalStorage);
button.addEventListener("click", addLists);
list.addEventListener('click', deleteLists);
filter.addEventListener('click', filterLists);

function addLists(event) {
    event.preventDefault();
    if (input.value) {
        const addedDiv = document.createElement('div');
        addedDiv.classList.add("todo");
        const newLi = document.createElement('li');
        newLi.textContent = input.value; // could also be innerText
        newLi.classList.add('li-item');
        addedDiv.appendChild(newLi);
        saveListsToLocal(input.value);
        // for check box
        const doneBtn = document.createElement('button');
        doneBtn.innerHTML = `<i class="fas fa-check"></i>`;
        doneBtn.classList.add("done-btn");
        addedDiv.appendChild(doneBtn);
        // for deletion
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;
        deleteBtn.classList.add("delete-btn");
        addedDiv.appendChild(deleteBtn);
        addedDiv.children[2].disabled = true;
        addedDiv.children[2].style.opacity = '0.7';
        // deleteBtn.addEventListener('click', (e) => {
        //     addedDiv.remove()
        // })
        list.appendChild(addedDiv);
        input.value = "";
    }
}
function deleteLists(event) {
    const item = event.target;
    if (item.classList[0] === 'delete-btn') {
        filter.value = '';
        filterInfo.style.display = 'none';
        const parentItem = item.parentElement;
        parentItem.classList.add('fall');
        removeLocalList(parentItem);
        parentItem.addEventListener('transitionend', () => {
            parentItem.remove();
        })
    }
    if (item.classList[0] === 'done-btn') {
        filter.value = '';
        filterInfo.style.display = 'none';
        const parentItem = item.parentElement;
        parentItem.classList.toggle('completed');
        if (parentItem.classList.contains('completed')) {
            parentItem.children[2].disabled = false;
            parentItem.children[2].style.opacity = '1';

        } else {
            parentItem.children[2].disabled = true;
            parentItem.children[2].style.opacity = '0.7';
        }
    }
}

function filterLists(e) {
    if (list.children.length) {
        filterInfo.style.display = 'block';
    }
    const todos = list.childNodes;
    let cntAll = 0, cntCompleted = 0, cntNotCompleted = 0;
    todos.forEach((todo) => {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                cntAll++;
                filterInfo.style.display = 'block';
                filterInfo.innerHTML = `All items ${cntAll}`;
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                    cntCompleted++;
                } else {
                    todo.style.display = 'none';
                }
                cntAll++;
                filterInfo.style.display = 'block';
                filterInfo.innerHTML = `Completed items ${cntCompleted}`;
                break;
            case "notcompleted":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'none';
                } else {
                    todo.style.display = 'flex';
                    cntNotCompleted++;
                }
                cntAll++;
                filterInfo.style.display = 'block';
                filterInfo.innerHTML = `Not completed items ${cntNotCompleted}`;
                break;
            default:
                filterInfo.style.display = 'none';
        }
    })
}
function saveListsToLocal(list) {
    let lists;
    if (localStorage.getItem('todos') === null) {
        lists = [];
    } else {
        lists = JSON.parse(localStorage.getItem('todos'));
    }
    lists.push(list.trim());
    localStorage.setItem('todos', JSON.stringify(lists));
}

function getListsFromLocalStorage() {
    let lists;
    if (localStorage.getItem('todos') === null) {
        lists = [];
    } else {
        lists = JSON.parse(localStorage.getItem('todos'));
    }
    lists.forEach((localList) => {
        const addedDiv = document.createElement('div');
        addedDiv.classList.add("todo");
        const newLi = document.createElement('li');
        newLi.textContent = localList; // could also be innerText
        newLi.classList.add('li-item');
        addedDiv.appendChild(newLi);
        // for check box
        const doneBtn = document.createElement('button');
        doneBtn.innerHTML = `<i class="fas fa-check"></i>`;
        doneBtn.classList.add("done-btn");
        addedDiv.appendChild(doneBtn);
        // for deletion
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;
        deleteBtn.classList.add("delete-btn");
        addedDiv.appendChild(deleteBtn);
        addedDiv.children[2].disabled = true;
        addedDiv.children[2].style.opacity = '0.7';
        list.appendChild(addedDiv);
    })
}

function removeLocalList(localList) {
    let lists;
    if (localStorage.getItem('todos') === null) {
        lists = [];
    } else {
        lists = JSON.parse(localStorage.getItem('todos'));
    }
    const index = localList.children[0].innerText;
    lists.splice(lists.indexOf(index), 1);
    localStorage.setItem('todos', JSON.stringify(lists));
}
