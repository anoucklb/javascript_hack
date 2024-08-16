const userInput = document.getElementById("user_input");
const listContainer = document.getElementById("list_container");
const addButton = document.getElementById("add_button");

retrieveTodoList();

// Alert user if input field is empty
addButton.addEventListener("click", function () {
  const task = userInput.value;

  if (task) {

    addItem(task);
    userInput.value = "";
    saveTodoList();

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
checkbox.id = "checkbox";
checkbox.setAttribute("onclick", "toggleStrikeThrough(this)");

const textNode = document.createElement("span");
textNode.textContent = task;

const removeButton = document.createElement("button");
removeButton.textContent = "Remove";
removeButton.classList.add("remove");
removeButton.setAttribute("onclick", "removeItem(this)");

const editButton =
document.createElement("button");
editButton.textContent = "Edit";
editButton.classList.add("edit");
editButton.setAttribute("onclick", "editItem(this)");


listContainer.appendChild(listItem);
listItem.appendChild(checkbox);
listItem.appendChild(textNode);
listItem.appendChild(removeButton);
listItem.appendChild(editButton);

updateProgressBar();
}


// Function to toggle strike-through style on checkbox check/uncheck and to trigger an update to the progress bar
function toggleStrikeThrough(checkbox) {
  const textElement = checkbox.nextElementSibling;
  if (checkbox.checked) {
    textElement.style.textDecoration = "line-through";
    updateProgressBar();
  } else {
    textElement.style.textDecoration = "none";
    updateProgressBar();
  }
}


// Function to remove an item from the list
function removeItem(button) {
  const item = button.parentElement;
  item.remove();
  updateProgressBar();
  saveTodoList();
}

// Function to edit list item
function editItem(button) {
  const item = button.parentElement;
  item.edit();

}
// Function to update the progress bar width when a change is made
function updateProgressBar() {
  //getting the length of all the items added in the list
  var list_length = document.querySelectorAll("li").length;
  //getting the length of all the checked items in the list
  var checked_length = document.querySelectorAll(
    "#list_container .task-checkbox:checked"
  ).length;
  //calculating the % of checked items in the list to assign a correspondant width value to the progress bar
  var progress_value = Math.round((checked_length / list_length) * 100);
  const my_progress = document.getElementById("my_progress");
  my_progress.style.width = `${progress_value}%`;
  // Displaying the percentage value
  my_progress.textContent = `${progress_value}%`;
}


// Save todo list so it doesnt disappear when you refresh the webpage
function saveTodoList() {

  let items = [];
  listContainer.querySelectorAll("li").forEach(function (listItem) {
    items.push(listItem.textContent.replace("Remove", ""));
  });

  localStorage.setItem("items", JSON.stringify(items));
}

function retrieveTodoList() {
  const items = JSON.parse(localStorage.getItem("items")) || [];
  items.forEach(addItem);
}