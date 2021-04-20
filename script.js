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
    if (temp === selectedCategory) {
      temp = null;
    }
  }
    selectedCategory = temp;
  
  if (selectedCategory != null) {
    document.querySelector(".cat-warning").setAttribute("hidden", "true");
  }
  console.log(e.target);

  // change height of enter button based on whether user input is showing or not
  // need to make this not hard-coded later!!!
  if (element.hasAttribute("hidden") === true) {
    enter.style.gridRowStart = "4";
  }
  else {
    enter.style.gridRowStart = "5";
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
  console.log("number is: " + number);
  console.log("selectedCategory: " + selectedCategory);
  // if no category and/or number provided, ask user to give input first
  if (number === "" || selectedCategory === null) {
    if (number === "") {
      document.querySelector(".num-warning").removeAttribute("hidden");
    }
    if (selectedCategory === null) {
      document.querySelector(".cat-warning").removeAttribute("hidden");
    }
  }
  else {
    console.log("hihi");
    document.querySelector(".ans").removeAttribute("hidden");
    // if warning unhidden, rehide it
    document.querySelector(".num-warning").setAttribute("hidden", "true");
    document.querySelector(".cat-warning").setAttribute("hidden", "true");
    // must 'await' to allow for response from API before saving/using this info
    let fact = await fetchFact(number);
    console.log("fact: " + fact);
  }
}

categories.forEach(cat => cat.addEventListener("click", pickCategory)); // add event listener to each category button
enterButton.addEventListener("click", displayFact);