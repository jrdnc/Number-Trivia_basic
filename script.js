const categories = document.querySelectorAll("div.cats button");
const enterButton = document.querySelector("div.enter button");
let selectedCategory = null;

/************************ Request User Input ************************/
function pickCategory(e) {
  const element = document.querySelector("div.input");
  const enter = document.querySelector("div.enter");

  // store current button as selected category
  let temp = e.target.innerText.toLowerCase();

  // if same category || diff category and hidden, then toggle hidden
  if ((temp === selectedCategory) || (temp != selectedCategory && element.hasAttribute("hidden"))) {
    element.toggleAttribute("hidden");
    // when deselecting a category, make sure the "temp" variable is updated
    if (temp === selectedCategory) {
      temp = null;
    }
  }
  // set "selectedCategory" variable to current category slection
  selectedCategory = temp;
  
  // if a category is selected, then the category warning will not show
  if (selectedCategory != null) {
    document.querySelector(".cat-warning").setAttribute("hidden", "true");
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

/************************ Retrieve/Display Info ************************/
// grab fact from numbers API
async function fetchFact(num) {
  // must 'await' to allow the fetch to get us the info we need
  // convert Promise to json format, then grab fact from json and return
  let text = await fetch(`http://numbersapi.com/${num}?json`)
    .then(response => response.json())
    .then(data => {return data.text});
  return text;
}

// gets appropriate fact from Numbers API based on user input and displays on screen
async function displayFact(e) {
  let number = document.querySelector(".user").value;
  // if no category and/or number provided, ask user to give appropriate input first (only one category shows at a time)
  let catWarn = document.querySelector(".cat-warning");
  let numWarn = document.querySelector(".num-warning");
  if (number === "" || selectedCategory === null) {
    if (selectedCategory === null) {
      catWarn.removeAttribute("hidden");
      numWarn.setAttribute("hidden", true);
    }
    else if (number === "") {
      numWarn.removeAttribute("hidden");
    }
  }
  else { // if user has done everthing properly, show the appropriate fact
    document.querySelector(".ans").removeAttribute("hidden");
    // if warning unhidden, rehide it
    numWarn.setAttribute("hidden", "true");
    catWarn.setAttribute("hidden", "true");
    // must 'await' to allow for response from API before saving/using this info
    let fact = await fetchFact(number);

    // paragraph element that contains the fact
    let answer = document.querySelector(".fact");

    // add fact to html in order to display on page
    factTextNode = document.createTextNode(fact);
    // get rid of old text before adding new text
    if (answer.hasChildNodes()) {
      answer.removeChild(answer.firstChild);
    }
    answer.appendChild(factTextNode);
  }
}

/*************************** Event Listeners ***************************/
categories.forEach(cat => cat.addEventListener("click", pickCategory)); // add event listener to each category button
enterButton.addEventListener("click", displayFact);