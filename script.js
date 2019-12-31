//Caching elements we need
var button = document.getElementById('enter');
var input = document.getElementById('userinput');
var ul = document.querySelector('ul');
var listItems = document.getElementsByTagName('li');

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
    deleteButton.addEventListener('click', toggleDoneClass);
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
function toggleDoneClass() {
	this.parentElement.classList.toggle('done');
}

// If button clicked, run the function
button.addEventListener('click', addListAfterClick);
// If "enter" key pressed, run the function
input.addEventListener('keypress', addListAfterKeypress);