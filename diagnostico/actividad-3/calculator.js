const display = document.getElementById('display');
let operacion = "";
let results = false;

// funciones específicas
function handleNumberClick(value) {
  if (display.value === '0' || results) {
    display.value = value;
    results = false;
  } else {
    display.value += value;
  }
  operacion += value;
}

function handleOperatorClick(value) {
  if (!results) {
    display.value += value;
    operacion += value;
  } else {
    operacion = display.value + value;
    display.value = operacion;
    results = false;
  }
}

function handleEqualClick() {
  try {
    const result = eval(operacion);
    display.value = result;
    operacion = result.toString();
    results = true;
  } catch {
    display.value = 'Error';
    operacion = "";
  }
}

function handleClearClick() {
  display.value = '0';
  operacion = "";
}

// refactoring por id
// numeros
document.getElementById('btn-0').addEventListener('click', () => handleNumberClick('0'));
document.getElementById('btn-1').addEventListener('click', () => handleNumberClick('1'));
document.getElementById('btn-2').addEventListener('click', () => handleNumberClick('2'));
document.getElementById('btn-3').addEventListener('click', () => handleNumberClick('3'));
document.getElementById('btn-4').addEventListener('click', () => handleNumberClick('4'));
document.getElementById('btn-5').addEventListener('click', () => handleNumberClick('5'));
document.getElementById('btn-6').addEventListener('click', () => handleNumberClick('6'));
document.getElementById('btn-7').addEventListener('click', () => handleNumberClick('7'));
document.getElementById('btn-8').addEventListener('click', () => handleNumberClick('8'));
document.getElementById('btn-9').addEventListener('click', () => handleNumberClick('9'));
document.getElementById('btn-dot').addEventListener('click', () => handleNumberClick('.'));

// operadores
document.getElementById('btn-add').addEventListener('click', () => handleOperatorClick('+'));
document.getElementById('btn-subtract').addEventListener('click', () => handleOperatorClick('-'));
document.getElementById('btn-multiply').addEventListener('click', () => handleOperatorClick('*'));
document.getElementById('btn-divide').addEventListener('click', () => handleOperatorClick('/'));

// igual y borrar
document.getElementById('btn-equal').addEventListener('click', handleEqualClick);
document.getElementById('btn-clear').addEventListener('click', handleClearClick);
