const categories = document.querySelectorAll("div.cats button");
const enterButton = document.querySelector("div.enter button");
const randomButton = document.querySelector(".rand");
let selectedCategory = null;

/************************ Request User Input ************************/

// return true if need to deboss, else return false
function btnDeboss(same, ishidden) {
  if (same) {
    return null;
  }
  else if (ishidden) {
    return true;
  }
  else {
    return false;
  }
}

// sets everything up when you select or deselect a category
function pickCategory(e) {
  const element = document.querySelector("div.input");
  document.querySelector(".user").value = "";

  // store current button as selected category
  let temp = e.target.innerText.toLowerCase();

  // emboss/deboss btns as needed
  let needDeboss = btnDeboss(temp === selectedCategory, element.hasAttribute("hidden"));
  console.log(needDeboss);
  if (needDeboss === null) {
    document.querySelector(`.${selectedCategory}`).classList.toggle("deboss");
  }
  else if (needDeboss) {
    document.querySelector(`.${temp}`).classList.add("deboss");
  }
  else {
    document.querySelector(`.${selectedCategory}`).classList.remove("deboss");
    document.querySelector(`.${temp}`).classList.add("deboss");
  }

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
  
  // if a category is not selected, then the category warning will show
  if (selectedCategory != null) {
    checkWarnings(selectedCategory);
    // document.querySelector(".cat-warning").setAttribute("hidden", "true");
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
}

/************************ Retrieve/Display Info ************************/
// check if format of given input is valid
function validInput(num) {
  let isValid = false;
  if (selectedCategory === "math" || selectedCategory === "trivia") {
    isValid = !isNaN(num);
  }
  else if (selectedCategory === "date") { // date format is mm/dd
    date = num.split("/");
    if (date.length === 2) { // if there are exactly 2 separate numbers listed in date
      let month = Number(date[0]);
      let day = Number(date[1]);
      if (Number.isInteger(month) && Number.isInteger(day)) { // if numbers provided are integers (not floats)
        if (month > 0 && month < 13) { // if first number is a month
          if (month === 2) { // if month is feb, check for at most 29 days

          }
          else if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) { // if month is jan, mar, may, jul, aug, oct, dec, check for 31 days
            if (day > 0 && day < 31) {
              isValid = true;
            }
          }
          else if (month === 4 || month === 6 || month === 9 || month === 11) { // if month is apr, jun, sep, nov, check for 30 days
            if (day > 0 && day < 30) {
              isValid = true;
            }
          }
        }
      }
    }
  }
  else if (selectedCategory === "year") {
    if (Number.isInteger(Number(num))) {
      isValid = true;
    }
  }
  return isValid;
}

// grab fact from numbers API
async function fetchFact(num, randomize) {
  // must 'await' to allow the fetch to get us the info we need
  // convert Promise to json format, then grab fact from json and return
  let text = "";
  if (randomize) {
    text = await fetch(`http://numbersapi.com/random/${selectedCategory}?json`)
      .then(response => response.json())
      .then(data => {return data.text});
  }
  else {
    switch (selectedCategory) {
      case "math":
      case "year":
        text = await fetch(`http://numbersapi.com/${num}/${selectedCategory}?json`)
          .then(response => response.json())
          .then(data => {return data.text});
        break;
      case "trivia":
        text = await fetch(`http://numbersapi.com/${num}?json`)
          .then(response => response.json())
          .then(data => {return data.text});
        break;
      case "date":
        let date = num.split("/");
        text = await fetch(`http://numbersapi.com/${date[0]}/${date[1]}/${selectedCategory}?json`)
          .then(response => response.json())
          .then(data => {return data.text});
        break;
    }
    text = await fetch(`http://numbersapi.com/${num}?json`)
      .then(response => response.json())
      .then(data => {return data.text});
  }
  return text;
  
}

// checks for user input warnings
// if no category and/or number provided, ask user to give appropriate input first (only one category shows at a time)
function checkWarnings(currentCategory, number = null, rand = false) {
  let catWarn = document.querySelector(".cat-warning");
  let numWarn = document.querySelector(".num-warning");
  let invalidWarn = document.querySelector(".invalid-warning");
  if (currentCategory != null && number === null) {
    catWarn.setAttribute("hidden", "true");
    return false;
  }
  else if ((currentCategory === null || number === "") && rand != true) {
    if (currentCategory === null) {
      catWarn.removeAttribute("hidden");
      numWarn.setAttribute("hidden", true);
    }
    else if (number === "") {
      numWarn.removeAttribute("hidden");
      if (!invalidWarn.hasAttribute("hidden")) {
        invalidWarn.setAttribute("hidden", "true");
      }
    }
    return false;
  }
  else if (!validInput(number)) { // check if 'number' has appropriate format
    // show invalid input warning
    console.log(invalidWarn);
    invalidWarn.removeAttribute("hidden");
    if (!numWarn.hasAttribute("hidden")) {
      numWarn.setAttribute("hidden", "true");
    }
    return false;
  }
  else {
    document.querySelector(".ans").removeAttribute("hidden");
    // if warning unhidden, rehide it
    numWarn.setAttribute("hidden", "true");
    catWarn.setAttribute("hidden", "true");
    invalidWarn.setAttribute("hidden", "true");
    return true;
  }
}

// gets appropriate fact from Numbers API based on user input and displays on screen
async function displayFact(e) {
  let number = document.querySelector(".user").value;
  let noWarnings = checkWarnings(selectedCategory, number, randomButton.checked);
  let randomize = false;
  let fact = "";
  let answer = document.querySelector(".fact");

  if (noWarnings) { // if user has done everthing properly, show the appropriate fact
    if (randomButton.checked === true) { // category has to be selected in order for this to be true
      randomize = true;
    }
    // must 'await' to allow for response from API before saving/using this info
    fact = await fetchFact(number, randomize);

    // add fact to html in order to display on page
    factTextNode = document.createTextNode(fact);
    // get rid of old text before adding new text
    if (answer.hasChildNodes()) {
      answer.removeChild(answer.firstChild);
    }
    answer.appendChild(factTextNode);
  }
  else {
    // clear user input bar
    document.querySelector(".user").value = "";
  }
}

// disable textbox if random option is checked
function disableTextbox() {
  let textbox = document.querySelector("input.user");
  if (randomButton.checked) {
    textbox.disabled = true;
    // make background color grey
  }
  else {
    textbox.disabled = false;
    // remove background color
  }
}

/*************************** Event Listeners ***************************/
categories.forEach(cat => cat.addEventListener("click", pickCategory)); // add event listener to each category button
enterButton.addEventListener("click", displayFact);
randomButton.addEventListener("click", disableTextbox);