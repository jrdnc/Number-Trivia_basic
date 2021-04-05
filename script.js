const categories = document.querySelectorAll('div.cats button');
const enterButton = document.querySelector('div.enter button');
let selectedCategory = null;

function selectCategory(e) {
  // store current button as selected category
  selectedCategory = e.target.innerText.toLowerCase();
  console.log(selectedCategory);
  // console.log(e);
  console.log(e.target);
  //ask for user input based on category
  // let input;
  const element = document.querySelector('div.input');
  const enter = document.querySelector('div.enter');
  element.toggleAttribute('hidden');
  if (element.hasAttribute('hidden') === false) {
    enter.style.gridRowStart = '5';
  }
  else {
    enter.style.gridRowStart = '4';
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