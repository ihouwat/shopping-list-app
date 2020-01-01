//Caching elements we need
let button = document.getElementById('enter');
let input = document.getElementById('userinput');
let ul = document.querySelector('ul');
let listItems = document.getElementsByTagName('li');
let list = document.querySelectorAll('div.category ul'); // creates Nodelist

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
    var deleteButton = document.createElement('button');
    deleteButton.appendChild(document.createTextNode('X'));
    elem.appendChild(deleteButton);
    deleteButton.addEventListener('click', removeItem);
}

function createListElement() {
	// create element
	var li = document.createElement('li');
	//createTextNode is the text element within the tag (how DOM works)
	li.appendChild(document.createTextNode(input.value));
    // Add delete button to new elements
  addDeleteButton(li);
	// Attach to existing ul so it appears on the page
	ul.appendChild(li);
	// If the parent grocery category is empty/hidden, it becomes visible
	toggleListDisplay();
	//Clears the input area
	input.value = "";
}

function addListAfterClick() {
	//Make sure the input value is not empty
	if (inputLength() > 0) {
		createListElement();
	}
}

// Same function as click, but for keypress. Every time keypress,
// Add parameter 'event'.
function addListAfterKeypress(event) {
		// Event.keycode looks for keypress. #13 is the enter button
		if (inputLength() > 0 && event.keyCode === 13) {
			createListElement();
		}
}

// Toggle .done class on click
function removeItem() {
  // Create list of complete items
  completedList = [];
  completedList.push(this.parentElement.textContent);
	this.parentElement.remove();
	toggleListDisplay();
}

// If ul empty, hide grocery category
function toggleListDisplay() {
  for(i=0; i < list.length; i++){
    if (list[i].childElementCount === 0) {
      list[i].parentElement.classList.add('hide');
    } else {
      list[i].parentElement.classList.remove('hide')
    }
  }
}

// If button clicked, run the function
button.addEventListener('click', addListAfterClick);
// If "enter" key pressed, run the function
input.addEventListener('keypress', addListAfterKeypress);
