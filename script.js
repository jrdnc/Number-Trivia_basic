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

// grab fact from numbers API
async function fetchFact(num = 111) {
  // must 'await' to allow the fetch to get us the info we need
  let text = await fetch(`http://numbersapi.com/${num}?json`)
    .then(response => response.json())
    .then(data => {return data.text});
  return text;
}

// gets appropriate fact from Numbers API based on user input and displays on screen
async function displayFact(e) {
  let number = document.querySelector(".user").value;
  console.log(number);
  console.log(selectedCategory);
  // if no category selected, ask user to select a category first
  if (selectedCategory === null) {
    document.querySelector(".warning").toggleAttribute('hidden');
  }
  else {
    document.querySelector(".ans").toggleAttribute('hidden');
    // if warning unhidden, rehide it
    // must 'await' to allow for response from API before saving/using this info
    let fact = await fetchFact(number);
    console.log("fact: " + fact);
  }
}

categories.forEach(cat => cat.addEventListener('click', selectCategory)); // add event listener to each category button
enterButton.addEventListener('click', displayFact);