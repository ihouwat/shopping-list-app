//Caching elements we need
let button = document.getElementById('enter');
let input = document.getElementById('userinput');
let listItems = document.getElementsByTagName('li');
let activeList = document.querySelector('#active div.category ul'); // creates Nodelist
let completedList = document.querySelector('#completed div.category ul')

// Starting list
for (i = 0; i < listItems.length; i++) {
    addDeleteButton(listItems[i]);
}

// Get input length
function inputLength() {
	return input.value.length;
}

// Add Delete button
function addDeleteButton(elem) {
  if(elem.parentElement !== completedList) {
    var deleteButton = document.createElement('button');
    deleteButton.appendChild(document.createTextNode('X'));
    elem.appendChild(deleteButton);
    deleteButton.addEventListener('click', removeItem);
  }
}

function createListElement(category, item) {
	// create element
	var li = document.createElement('li');
	//createTextNode is the text element within the tag (how DOM works)
	li.appendChild(document.createTextNode(item));
  // Add delete button to new elements, except on completedList
  if(category !== completedList){
    addDeleteButton(li);
  }
	// Attach to category's  ul so it appears on the page
	category.appendChild(li);
	// If the parent grocery category is empty/hidden, it becomes visible
	toggleListDisplay();
	//Clears the input area
	input.value = "";
}

function addListAfterClick() {
	//Make sure the input value is not empty
	if (inputLength() > 0) {
		createListElement(activeList, input.value);
	}
}

// Same function as click, but for keypress. Every time keypress,
// Add parameter 'event'.
function addListAfterKeypress(event) {
		// Event.keycode looks for keypress. #13 is the enter button
		if (inputLength() > 0 && event.keyCode === 13) {
			createListElement(activeList, input.value);
		}
}

// Toggle .done class on click
function removeItem() {
  createListElement(completedList, this.parentElement.textContent);
	this.parentElement.remove();
	toggleListDisplay();
}

// If ul empty, hide grocery category
function toggleListDisplay() {
  for(i=0; i < activeList.length; i++){
    if (activeList[i].childElementCount === 0) {
      activeList[i].parentElement.classList.add('hide');
    } else {
      activeList[i].parentElement.classList.remove('hide')
    }
  }
}

// If button clicked, run the function
button.addEventListener('click', addListAfterClick);
// If "enter" key pressed, run the function
input.addEventListener('keypress', addListAfterKeypress);
// If any categories empty, they do not display on document load
document.addEventListener('DOMContentLoaded', (event) => {
    toggleListDisplay();
});
