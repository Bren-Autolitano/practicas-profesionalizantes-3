const canvas = document.getElementById("miCanvas");
const ctx = canvas.getContext("2d");

let posX = 20;
const posY = canvas.height / 2;
const radio = 20;
const velocidad = 2;

let movimientoActivo = true;

function dibujarCirculo() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(posX, posY, radio, 0, Math.PI * 2);
  ctx.fillStyle = "blue";
  ctx.fill();
  ctx.closePath();
}

function actualizarMovimiento() {
  if (movimientoActivo) {
    posX += velocidad;
    if (posX - radio > canvas.width) {
      posX = -radio;
    }
  }
  dibujarCirculo();
}

setInterval(actualizarMovimiento, 20);

// Semáforo
const luzRoja = document.getElementById("luzRoja");
const luzVerde = document.getElementById("luzVerde");

function cambiarSemaforo() {
  movimientoActivo = !movimientoActivo;

  if (movimientoActivo) {
    luzVerde.classList.add("activo");
    luzRoja.classList.remove("activo");
  } else {
    luzVerde.classList.remove("activo");
    luzRoja.classList.add("activo");
  }
}

cambiarSemaforo(); // inicial
setInterval(cambiarSemaforo, 3000);
