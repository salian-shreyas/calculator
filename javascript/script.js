function operate(opearator, num1, num2) {

  switch (opearator) {
    case '+':
      alert(add(num1, num2));
      break;
    case '-':
      alert(substract(num1, num2));
      break;
    case '*':
      alert(multiply(num1, num2));
      break;
    case '/':
      alert(divide(num1, num2));
      break;
    default:;
  }
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
