const firstNUmber = parseInt(getInputArr()[0]);
const secondNumber = parseInt(getInputArr()[2]);
const operator = getInputArr()[1];

const scrn = document.querySelector("#screen");
const inputBtns = document.querySelectorAll(".input");
for (let btn of inputBtns) {
  btn.addEventListener("click", addToScreen);
}

const clear = document.querySelector("#clear");
clear.addEventListener("click", clearInput);

const equal = document.querySelector("#equal");
equal.addEventListener("click", () => {
  const result = operate(firstNUmber, operator, secondNumber);
  updateScreen(result);
});

function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

function operate(firstNumber, operator, secondNumber) {
  let result;

  switch (operator) {
    case "+":
      result = add(firstNumber, secondNumber);
      break;
    case "-":
      result = substract(firstNumber, secondNumber);
      break;
    case "*":
      result = multiply(firstNumber, secondNumber);
      break;
    case "/":
      result = divi(firstNumber, secondNumber);
      break;
  }
  return result;
}

function getInput() {
  const input = localStorage.getItem("screen-input");
  if (input === null) {
    return;
  }
  return input;
}

function addToScreen(elem) {
  if (scrn.textContent === "0") {
    scrn.textContent = "";
  }
  scrn.textContent += elem.target.textContent;
  storeInput("screen-input", scrn.textContent);
}
function storeInput(key, value) {
  localStorage.setItem(key, value);
}

function clearInput() {
  localStorage.removeItem("screen-input");
  scrn.textContent = "0";
}

function initializeSCreen() {
  scrn.textContent = getInput();
}
function getInputArr() {
  return getInput().split("");
}

function updateScreen(update) {
  scrn.textContent = "";
  scrn.textContent = update;
}

window.onload = initializeSCreen;
