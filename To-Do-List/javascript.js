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
checkbox.addEventListener("click", function () {
  toggleStrikeThrough(this);
});

const textNode = document.createElement("span");
textNode.textContent = task;

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
  if (progress_value === 100) {
    console.log("Well done on completing all of your tasks, here is a little treat")
    show_cute_pets();
  }
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

function hide_cute_pets() {
  const child = document.getElementById("pet_image");
  child.parentNode.removeChild(child)
}
function show_cute_pets() {
  let img = document.createElement('img');
  img.src = 'assets/cute_cats.jpg';
  img.id = 'pet_image';
  img.onclick = () => hide_cute_pets()
  const div = document.getElementById("cute_pets");

  div.appendChild(img);
}

