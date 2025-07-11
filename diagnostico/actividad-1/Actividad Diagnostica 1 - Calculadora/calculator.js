const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');          // solo numeros y punto
const operators = document.querySelectorAll('.operator');      // solo operadores
const equal = document.querySelector('.equal');
const erase = document.querySelector('.vestimenta-boton-delete');

let operacion = "";
let results = false;

// Clic en números y punto
buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (display.value === '0' || results) {
        display.value = button.textContent;
        results = false;
    } else {
        display.value += button.textContent;
    }
    operacion += button.textContent;
  });       
});

// Clic en operadores
operators.forEach(button => {
    button.addEventListener('click', () => {
      if (!results) {
        display.value += button.textContent;
        operacion += button.textContent;
      } else {
        operacion = display.value + button.textContent;
        display.value = operacion;
        results = false;
      }
    });
});

// Clic en igual
equal.addEventListener('click', () => {
    try {
      const result = eval(operacion);
      display.value = result;
      operacion = result.toString();
      results = true;
    } catch {
      display.value = 'Error';
      operacion = "";
    }
});

// Clic en borrar
erase.addEventListener('click', () => {
    display.value = '0';
    operacion = "";
});
