const input = document.querySelector(".input");
const button = document.querySelector(".button");
button.addEventListener("click", addLists);
const list = document.querySelector(".list");
list.addEventListener('click', deleteLists);
function addLists(event) {
    event.preventDefault();
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
function deleteLists(event) {
    const item = event.target;
    if (item.classList[0] === 'delete-btn') {
        const parentItem = item.parentElement;
        parentItem.remove();
    }
}