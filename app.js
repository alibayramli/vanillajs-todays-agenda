const input = document.querySelector(".input");
const button = document.querySelector(".button");
const list = document.querySelector(".list");
const filter = document.querySelector('.filter-list');

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
        // deleteBtn.addEventListener('click', (e) => {
        //     addedDiv.remove()
        // })
        list.append(addedDiv);
        input.value = "";
    }

}
function deleteLists(event) {
    const item = event.target;
    if (item.classList[0] === 'delete-btn') {
        const parentItem = item.parentElement;
        parentItem.classList.add('fall');
        parentItem.addEventListener('transitionend', () => {
            parentItem.remove();
        })
    }
    if (item.classList[0] === 'done-btn') {
        const parentItem = item.parentElement;
        parentItem.classList.toggle('completed');
    }
}

function filterLists(e) {
    const todos = list.childNodes;
    const filterInfo = document.querySelector('.filtered-list');
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

