const scrn = document.querySelector("#screen");
const inputBtns = document.querySelectorAll(".input");
for (let btn of inputBtns) {
  btn.addEventListener("click", addToScreen);
}

const clear = document.querySelector("#clear");
clear.addEventListener("click", clearInput);

const equal = document.querySelector("#equal");
equal.addEventListener("click", () => {
  const result = operate();
  updateScreen(result);
});

const del = document.querySelector("#delete");
del.addEventListener('click', () =>{
  if (!scrn.textContent === ''){
    scrn.textContent.slice(-1);
  }
})
function removeFromScreen(string){
  if (!scrn.textContent === ''){
    scrn.textContent.slice(-1);
  }
}


function operate() {
  const input = getInput();
  const result = safeEval(input);
  return result;
}

function safeEval(expression) {
  const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    x: (a, b) => a * b,
    "/": (a, b) => a / b,
  };

  const tokens = expression.match(/(\d+(\.\d+)?|\+|\-|\x|\/)/g);
  if (!tokens) {
    throw new Error("Invalid expression");
  }
  let result = parseFloat(tokens[0]);
  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const nextValue = parseFloat(tokens[i + 1]);

    if (operators[operator]) {
      result = operators[operator](result, nextValue);
    } else {
      throw new Error("Invalid operator");
    }
  }
  return result;
}

function getInput() {
  const input = localStorage.getItem("screen-input");
  if (input === null) {
    return "";
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

function updateScreen(update) {
  scrn.textContent = "";
  scrn.textContent = update;
}

window.onload = initializeSCreen;
