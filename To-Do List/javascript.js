const userInput = document.getElementById("user_input");
const listContainer = document.getElementById("list_container");
const addButton = document.getElementById("add_button");

retrieveTodoList();

// Alert user if input field is empty
addButton.addEventListener("click", function () {
  const task = userInput.value;
  if (task) {
    var  t  = {
      name: task,
      isChecked: false
    }
    addItem(t);
    userInput.value = "";
    // saveTodoList();
    save(t);
    updateProgressBar();
  } else {
         alert("Please add a task 😊");
  }
});


// Create and display new items
function addItem (task){

  const listItem = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");
  checkbox.id = task.id ?? "checkbox_" + new Date().getTime();
  task.id = checkbox.id;

  checkbox.addEventListener("click", function () {
    toggleStrikeThrough(this);
  });

  const textNode = document.createElement("span");
  textNode.textContent = task.name;

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.classList.add("remove");
  removeButton.addEventListener("click", function () {
    removeItem(this);
  });

  const editButton =
  document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit");
  editButton.addEventListener("click", function () {
    editItem(this);
  });

  listContainer.appendChild(listItem);
  listItem.appendChild(checkbox);
  listItem.appendChild(textNode);
  listItem.appendChild(removeButton);
  listItem.appendChild(editButton);


  const textElement = checkbox.nextElementSibling;
  if (task.isChecked) {
    textElement.style.textDecoration = "line-through";
    checkbox.checked= true;
  }
}


// Function to toggle strike-through style on checkbox check/uncheck and to trigger an update to the progress bar
function toggleStrikeThrough(checkbox) {
  const textElement = checkbox.nextElementSibling;

  const items = JSON.parse(localStorage.getItem("items")) || [];
  let t = items.filter((item) => item.id === checkbox.id)[0];
  let index  = items.findIndex((item) => item.id === checkbox.id);

  if (checkbox.checked) {
    textElement.style.textDecoration = "line-through";
    t.isChecked = true;
  } else {
    textElement.style.textDecoration = "none";
    t.isChecked = false;
  }
  items[index] = t;
  localStorage.setItem("items", JSON.stringify(items));
  updateProgressBar();
}


// Function to remove an item from the list
function removeItem(button) {
  const item = button.parentElement;
  const  checkbox  = item.querySelector("input");

  let savedItems = JSON.parse(localStorage.getItem("items")) || [];
  savedItems = savedItems.filter((item) => item.id !== checkbox.id);
  localStorage.setItem("items", JSON.stringify(savedItems));

  item.remove();
  updateProgressBar();
}

// Function to edit list item
function editItem(button) {
  const item = button.parentElement;
  const textNode = item.querySelector ("span");

  const input = document.createElement("input");
  input.type = "text";
  input.value = textNode.textContent;

  item.replaceChild(input, textNode);

  input.addEventListener("blur", function () {
    textNode.textContent = input.value;
    item.replaceChild(textNode, input);
    saveTodoList();
    input.focus();
  });

}
// Function to update the progress bar width when a change is made
function updateProgressBar() {

  const items = JSON.parse(localStorage.getItem("items")) || [];
  const checkedItems = items.filter((item) => item.isChecked);

  //calculating the % of checked items in the list to assign a correspondant width value to the progress bar
  var progress_value = Math.round((checkedItems.length / items.length) * 100);
  const my_progress = document.getElementById("my_progress");
  my_progress.style.width = `${progress_value}%`;
  // Displaying the percentage value
  my_progress.textContent = `${progress_value}%`;
}

function save(task) {
  let items = JSON.parse(localStorage.getItem("items")) || [];
  items.push(task);
  localStorage.setItem("items", JSON.stringify(items));
}

function retrieveTodoList() {
  const items = JSON.parse(localStorage.getItem("items")) || [];
  items.forEach(addItem);
  updateProgressBar();
}