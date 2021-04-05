const categories = document.querySelectorAll('div.cats button');
const enterButton = document.querySelector('div.enter button');
let selectedCategory = null;

function selectCategory(e) {
  const element = document.querySelector('div.input');
  const enter = document.querySelector('div.enter');
  // store current button as selected category
  let temp = e.target.innerText.toLowerCase();
  console.log(temp);
  console.log(selectedCategory);
  // if same category || diff category and hidden, then toggle hidden
  if ((temp === selectedCategory) || (temp != selectedCategory && element.hasAttribute('hidden'))) {
    console.log("Hi!");
    element.toggleAttribute('hidden');
  }
  selectedCategory = temp;
  console.log(selectedCategory);
  console.log(e.target);
  console.log(element.hasAttribute('hidden'));
  //ask for user input based on category
  // let input;

  // shift enter button based on whether user input is showing or not
  if (element.hasAttribute('hidden') === true) {
    enter.style.gridRowStart = '4';
  }
  else {
    enter.style.gridRowStart = '5';
  }

  // create new div element to be inserted
  // if (!document.querySelector('div.input')) {
  //   element = document.createElement("div");
  //   element.className += "input";
  //   // element.className += element.classList.contains("input") ? "" : "input";
  //   input = document.createElement("input");
  // }
  // else {
  //   element = document.querySelector('div.input');
  //   input = document/querySelector('div.input input')
  // }
  
  // unhide input element
  if (selectedCategory === "trivia") {




    // element.style.display = "block";
    // // place input into div
    // element.appendChild(input);
    // // append element to html
    // document.querySelector('div.category').insertAdjacentElement('afterend', element);

  }
    // math & trivia - enter a specifc number or randomize
    // date - enter a date or randomize
  // deboss button
}

function displayFact(e) {
  console.log("enter");
  // based on current selected category and input given from user, display number fact (using Numbers API)
  // if no category selected, ask user to select a category first
    // insert { <p class="warning">Please select a category!</p> } underneath the enter button in the HTML
}

categories.forEach(cat => cat.addEventListener('click', selectCategory)); // add event listener to each category button
enterButton.addEventListener('click', displayFact);