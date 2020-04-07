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
    case "x":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
  }
}

const numberButtons = document.querySelectorAll('.number');
const dotButton = document.getElementById('dot');
const operatorButtons = document.querySelectorAll('.operator');
const equalButton = document.querySelector('#equal');
const clearButton = document.getElementById('clear');
const clearAllButton = document.getElementById('allClear');
const backspaceButton = document.getElementById('backspace');

const numberDisplay1 = document.querySelector('.numberDisplay1');
const numberDisplay2 = document.querySelector('.numberDisplay2');
const operatorDisplay = document.querySelector('.operatorDisplay');
const outputDisplay = document.querySelector('.output');

let number1 = "";
let number2 = "";
let operator = "";
let pointer = "1";
let result = "";

function updateInputDisplay() {
  numberDisplay1.textContent = number1;
  numberDisplay2.textContent = number2;
  operatorDisplay.textContent = operator;
}

function updateOutputDisplay() {
  outputDisplay.textContent = result;
}

function checkPointExists() {
  if(pointer === "1") {
    return number1.includes(".");
  } else if(pointer === "2") {
    return number2.includes(".");
  }
}

function logKey(e) {
  outputDisplay.textContent = "";
  if(pointer === "1") {
    if(e.target.textContent === "." && checkPointExists()) {
      return;
    } else {
      number1 += e.target.textContent;
    }
  } else if (pointer === "2") {
    if(e.target.textContent === "." && checkPointExists()) {
      return;
    } else {
      number2 += e.target.textContent;
    }
  }
  updateInputDisplay();
}

function logOperator(e) {
  if(number1 === "") {
    return;
  } else if (pointer === "1") {
    operator = e.target.textContent;
    updateInputDisplay();
    pointer = "2";
  } else if (pointer === "2" && number2===""){
    operator = e.target.textContent;
    updateInputDisplay();
  } else if (pointer === "2" && number2!=="") {
    execOperate();
    number1 = result.toString();
    number2 = "";
    result = "";
    operator = e.target.textContent;
  }
}

function execOperate() {
  number1 = parseFloat(number1);
  number2 = parseFloat(number2);
  result = operate(number1,number2,operator);
  updateOutputDisplay();
}

function logEqual() {
  if (number1==="" || number2==="") {
    outputDisplay.textContent = "ERROR";
  } else {
    execOperate();
    number1 = result.toString();
    number2 = "";
    pointer = "1";
  }
}

function clearCurrent() {
  if (result!=="") {
    clearAll();
  } else if(pointer==="2" && number2!=="") {
    number2 = "";
    updateInputDisplay();
  } else if (pointer==="2" && operator!==""){
    operator = "";
    updateInputDisplay();
    pointer = "1";
  } else if (pointer==="1") {
    number1 = "";
    updateInputDisplay();
  }
}

function clearAll() {
  number1 = "";
  number2 = "";
  operator = "";
  result = "";
  pointer = "1";
  updateInputDisplay();
  updateOutputDisplay();
}

function backspace() {
  if (result!=="") {
    result = "";
    updateOutputDisplay();
  } else if(pointer==="2" && number2!=="") {
    number2 = number2.slice(0, number2.length-1);
    updateInputDisplay();
  } else if (pointer==="2" && operator!==""){
    operator = "";
    updateInputDisplay();
    pointer = "1";
  } else if (pointer==="1") {
    number1 = number1.slice(0, number1.length-1);
    updateInputDisplay();
  }
}

numberButtons.forEach(numberButton => {
  numberButton.addEventListener('click', logKey);
});

operatorButtons.forEach(operatorButton => {
  operatorButton.addEventListener('click', logOperator);
});

equalButton.addEventListener('click', logEqual);

clearButton.addEventListener('click', clearCurrent);
clearAllButton.addEventListener('click', clearAll);

backspaceButton.addEventListener('click', backspace)
