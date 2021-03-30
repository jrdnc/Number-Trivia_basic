const categories = document.querySelectorAll('div.cats button');
const enter = document.querySelector('div.enter button')

function selectCategory(e) {
  console.log("category!");
}

function displayFact(e) {
  console.log("enter");
}

categories.forEach(cat => cat.addEventListener('click', selectCategory)); // add event listener to each category button
enter.addEventListener('click', displayFact);