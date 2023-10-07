let groceryInput = document.querySelector(".grocery-input");
let inputForm = document.querySelector(".input-div form");
let displayDiv = document.querySelector(".display-list");
let clearP = document.querySelector(".clear-p");
let deleteImg = document.querySelector(".delete-img");

let doneWithSetup = false;

(function () {
  let currentStorage = JSON.parse(localStorage.getItem("Grocery List"));
  if (currentStorage !== null && currentStorage.length > 0) {
    currentStorage.map((item) => {
      return addElements(item);
    });
  }
  doneWithSetup = true; //setting initial setup to true since we ran the initial setup function
})();

function addElements(value) {
  let p = document.createElement("p");
  p.innerText = value;
  displayDiv.appendChild(p);
  let img = document.createElement("img");
  img.setAttribute("class", "delete-img");
  img.setAttribute("alt", "trashcan icon");
  img.src = "images/delete.png";
  p.appendChild(img);
  if (doneWithSetup) {
    inputForm.reset(); //resets form after item has been added
    localAdd(value); //calling local storage function
  }
}

function localAdd(value) {
  if (localStorage.getItem("Grocery List") !== null) {
    let currentStorage = JSON.parse(localStorage.getItem("Grocery List"));
    currentStorage.push(value);
    localStorage.setItem("Grocery List", JSON.stringify(currentStorage));
  } else {
    localStorage.setItem("Grocery List", JSON.stringify([value]));
  }
}

function clearGroceryList() {
  localStorage.clear();
  location.reload();
}

function removeParent(e) {
  if (e.target.className === "delete-img") {
    let textToDelete = e.target.parentNode.innerText; // getting text so we can remove it from our localStorage array
    e.target.parentNode.remove(); //getting parent node so we can remove it as a whole
    deleteSelectedItem(textToDelete);
  }
}

function deleteSelectedItem(textToDelete) {
  let currentStorage = JSON.parse(localStorage.getItem("Grocery List"));
  let removedArr = currentStorage.filter((item) => item !== textToDelete); //removing grocery item from localStorage
  if (removedArr.length === 0) {
    localStorage.clear();
  } else {
    localStorage.setItem("Grocery List", JSON.stringify(removedArr));
  }
}

function handleClick(e) {
  e.preventDefault();
  let myForm = e.target;
  let value1;
  let fd = new FormData(myForm);
  for (const [key, value] of fd) {
    value1 = value;
  }

  if (value1.length === 0) {
    return inputForm.reset(); //checks if the user has inputted nothing if so reset the form
  }
  let currentStorage = JSON.parse(localStorage.getItem("Grocery List"));

  if (currentStorage === null) {
    addElements(value1); //checks if nothing is currently set in localStorage if so then add item directly
  } else if (
    currentStorage.every((item) => {
      return item !== value1; //checks to see if the user inputs a duplicate
    })
  ) {
    addElements(value1);
  }
}

inputForm.addEventListener("submit", handleClick);

clearP.addEventListener("click", clearGroceryList);

displayDiv.addEventListener("click", removeParent);
