const operation = {
  firstValue: null,
  currentOperation: null,
  startOfSecond: false,
  operationsKeyCode: [111, 106, 109, 107],
  equalsKeyCode: 187,
  backspaceKeyCode: 8,
  dotKeyCode: 110
}

const displayBar = document.getElementById('display-input');
const numbers = document.querySelectorAll('.number');
const dot = document.querySelector('.dot');
const operators = document.querySelectorAll('.operator');
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');
const backspace = document.getElementById('backspace');

numbers.forEach( item => item.addEventListener('click', selectNumber));

dot.addEventListener('click', selectDot);

operators.forEach(item => {
    item.addEventListener('click', selectOperation);
});

equals.addEventListener('click', performOperation);

clear.addEventListener('click', reset);

backspace.addEventListener( 'click', backSpace);


function backSpace() {
  displayBar.textContent = displayBar.textContent.trim().slice(0, -1);
}

function reset() {
    displayBar.textContent = '0';
    operation.firstValue = null;
    operation.currentOperation = null;
    startOfSecond = false;
}

function selectDot() {
    if (displayBar.textContent.includes('.')) return;
    emptyDisplay();

    displayBar.textContent = displayBar.textContent.trim() + '.';
}

function selectNumber(e) {
  emptyDisplay();
  if (displayBar.textContent.trim().length > 11) return;

  displayNumber(this.firstElementChild.textContent);
}

function keySelectNumber(number) {
  emptyDisplay();
  if (displayBar.textContent.trim().length > 11) return;

  displayNumber(number);
}

function isSecondValue() {
  return operation.startOfSecond;
}

// Empties display bar
// On start of calculation or on start of second input value
function emptyDisplay() {

  if ( displayBar.textContent === '0' || isSecondValue()) {
       displayBar.textContent = '';
  } else if (displayBar.textContent.includes('!')) {
       displayBar.textContent = '';
  }

  // Once started set start of second value to false
  if (operation.startOfSecond) operation.startOfSecond = false;
}

function getDisplayValue() {
  return +displayBar.textContent.trim();
}

function displayNumber(number) {
  displayBar.textContent = displayBar.textContent.trim() + number;
}

// On click
function selectOperation(e) {
  if (operation.currentOperation) performOperation();
  operation.firstValue = getDisplayValue();
  operation.currentOperation = this.firstElementChild.id;

  operation.startOfSecond = true;
}

// On key press
function keySelectOperation(operator) {
  if (operation.currentOperation) performOperation();

  operation.firstValue = getDisplayValue();
  operation.currentOperation = operator;

  operation.startOfSecond = true;
}

function performOperation() {

  const solution = operate(
    operation.currentOperation,
    operation.firstValue,
    getDisplayValue()
  );

  operation.currentOperation = null;
  displayBar.textContent = modifySolution(solution)
}

// Returns 'Invalid' message on invalid inputs
// Returns formatted solution on valid inputs
function modifySolution(solution) {
  return isNaN(solution) ? 'Invalid Format!':

         solution == 'Infinity' ? 'Spoiler!':

         roundNumber(solution); // Valid number
}

function roundNumber(number) {
  number = number.toString();

  if (getLength(number) > 12) {
    number = +number;
    number = number.toExponential(2);
  } else if (number.includes('.')) {
    number = Math.round(+number * 1000) / 1000;
  }

  return number;
}

function getLength(number) {
  return number.split('.')[0].length
}

// Mathces operator and calls respective functions for operation
function operate(opearator, num1, num2) {
  let solution;

  switch (opearator) {
    case '+':
      solution = add(num1, num2);
      break;
    case '-':
      solution = substract(num1, num2);
      break;
    case '*':
      solution = multiply(num1, num2);
      break;
    case '/':
      solution = divide(num1, num2);
      break;
    default: solution = displayBar.textContent.trim();
  }

  return solution;
}

// Arithmatic functions
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
  return b === 0 ? 'Infinity': a / b;
}

window.addEventListener('keydown', e => {

  let key = document.querySelector(`div[data-key='${e.keyCode}']`);
  if (!key) {
    key = document.querySelector(`div[data-key2='${e.keyCode}']`);
    if (!key) return;
  }

  key.classList.add('clicked');

  if (operation.operationsKeyCode.find(key => key === e.keyCode)) {
    keySelectOperation(key.firstElementChild.id);
  } else if (e.keyCode === operation.equalsKeyCode) {
    performOperation();
  } else if (e.keyCode === operation.dotKeyCode) {
    selectDot();
  } else if (e.keyCode === operation.backspaceKeyCode) {
    backSpace();
  } else {
    keySelectNumber(key.firstElementChild.textContent);
  }
});

const inputItems = document.querySelectorAll('.item');

inputItems.forEach( item => {
  item.addEventListener('transitionend', e => e.target.classList.remove('clicked'));
});
