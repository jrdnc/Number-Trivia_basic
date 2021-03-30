const categories = document.querySelectorAll('div.cats button');
const enter = document.querySelector('div.enter button')
let selectedCategory = null;

function selectCategory(e) {
  // store current button as selected category
  selectedCategory = e.target.innerText;
  console.log(selectedCategory);
  //ask for usesr input based on category
    // math & trivia - enter a specifc or randomize
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
enter.addEventListener('click', displayFact);