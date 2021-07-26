const operation = {
  firstValue: null,
  currentOperation: null,
  startOfSecond: false
}

const displayBar = document.querySelector('input');

const numbers = document.querySelectorAll('.number');
numbers.forEach( item => { item.addEventListener('click', selectNumber);
});

const operators = document.querySelectorAll('.operator');
operators.forEach(item => {
    item.addEventListener('click', selectOperation);
});

const equals = document.getElementById('equals');
equals.addEventListener('click', performOperation);

function selectNumber(e) {
  emptyDisplay();
  displayNumber(this.firstChild.textContent);
}

function isSecondValue() {
  return operation.startOfSecond;
}

function emptyDisplay() {
  if (displayBar.value === '0' || isSecondValue()) displayBar.value = '';
  else if (displayBar.value.includes('ERROR')) displayBar.value = '';

  if (operation.startOfSecond) operation.startOfSecond = false;
}

function getDisplayValue() {
  return +displayBar.value;
}

function displayNumber(number) {
  displayBar.value += number;
}

function selectOperation(e) {
  operation.firstValue = getDisplayValue();
  operation.currentOperation = this.firstChild.textContent;

  operation.startOfSecond = true;
}

function performOperation() {
  const solution = operate(
    operation.currentOperation,
    operation.firstValue,
    getDisplayValue()
  );

  displayBar.value = isNaN(solution) ? 'ERROR: NaN': solution;
}

function operate(opearator, num1, num2) {
  let solution;

  switch (opearator) {
    case '+':
      solution = add(num1, num2);
      break;
    case '-':
      solution = substract(num1, num2);
      break;
    case 'x':
      solution = multiply(num1, num2);
      break;
    case '/':
      solution = divide(num1, num2);
      break;
    default: solution = 'ERROR!';
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
  return a / b;
}























// This is comment
