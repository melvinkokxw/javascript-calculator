function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(num1, num2, operator) {
  switch(operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
  }
}

const numbers = document.querySelectorAll('.number');
const inputDisplay = document.querySelector('.input');

let inputStr = "";
let inputOpr = "";

function logKey(e) {
  inputStr += e.target.textContent;
  inputDisplay.textContent = inputStr;
}


numbers.forEach(number => {
  number.addEventListener('click', logKey);
});
