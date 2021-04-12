const categories = document.querySelectorAll('div.cats button');
const enterButton = document.querySelector('div.enter button');
let selectedCategory = null;

function selectCategory(e) {
  const element = document.querySelector('div.input');
  const enter = document.querySelector('div.enter');

  // store current button as selected category
  let temp = e.target.innerText.toLowerCase();

  // if same category || diff category and hidden, then toggle hidden
  if ((temp === selectedCategory) || (temp != selectedCategory && element.hasAttribute('hidden'))) {
    console.log("Hi!");
    element.toggleAttribute('hidden');
  }
  selectedCategory = temp;
  console.log(selectedCategory);
  console.log(e.target);
  console.log(element.hasAttribute('hidden'));

  // change height of enter button based on whether user input is showing or not
  // need to make this not hard-coded later!!!
  if (element.hasAttribute('hidden') === true) {
    enter.style.gridRowStart = '4';
  }
  else {
    enter.style.gridRowStart = '5';
  }

  // set placeholder text
  if (selectedCategory === "date") {
    element.firstElementChild.setAttribute("placeholder", "mm/dd");
  }
  else if (selectedCategory === "year") {
    element.firstElementChild.setAttribute("placeholder", "yyyy");;
  }
  else {
    element.firstElementChild.setAttribute("placeholder", "enter a number!");
  }
    // math & trivia - enter a specifc number or randomize
    // date - enter a date or randomize
  // deboss button
}

function displayFact(e) {
  let number = document.querySelector(".user").value;
  console.log(number);
  console.log(selectedCategory);
  // console.log(document.querySelector(".ans"));
  document.querySelector(".ans").toggleAttribute('hidden');
  let fact = document.createElement('script');
  // fact.setAttribute('src', 'http://numbersapi.com/111?json?text');
 
  fetch('http://numbersapi.com/111?json')
    .then(response => response.json())
    .then(data => console.log(data.text));
  // document.querySelector(".ans").appendChild(fact);
  // console.log(fact);
  // console.log(text);

  // based on current selected category and input given from user, display number fact (using Numbers API)
  // if no category selected, ask user to select a category first
    // insert { <p class="warning">Please select a category!</p> } underneath the enter button in the HTML
}

categories.forEach(cat => cat.addEventListener('click', selectCategory)); // add event listener to each category button
enterButton.addEventListener('click', displayFact);