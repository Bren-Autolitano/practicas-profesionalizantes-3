class ControlSemaforo {
    constructor(idRoja, idAmarilla, idVerde) {
      this.luzRoja = document.getElementById(idRoja);
      this.luzAmarilla = document.getElementById(idAmarilla);
      this.luzVerde = document.getElementById(idVerde);
      this.coloresOrden = ["roja", "amarilla", "verde"];
      this.indice = 0;
  
      this.apagarTodo();
      this.mostrarColorActual();
      this.intervalo = null;
  
      this.comenzarCiclo();
    }
  
    cambiarEstado() {
      this.apagarTodo();
      this.indice = (this.indice + 1) % this.coloresOrden.length;
      this.mostrarColorActual();
    }
  
    apagarTodo() {
      this.luzRoja.classList.remove("activo");
      this.luzAmarilla.classList.remove("activo");
      this.luzVerde.classList.remove("activo");
  
      this.luzRoja.classList.add("inactivo");
      this.luzAmarilla.classList.add("inactivo");
      this.luzVerde.classList.add("inactivo");
    }
  
    mostrarColorActual() {
      const color = this.coloresOrden[this.indice];
      console.log("Luz encendida:", color);
  
      switch (color) {
        case "roja":
          this.luzRoja.className = "luz-circulo luz-roja activo";
          break;
        case "amarilla":
          this.luzAmarilla.className = "luz-circulo luz-amarilla activo";
          break;
        case "verde":
          this.luzVerde.className = "luz-circulo luz-verde activo";
          break;
        default:
          console.error("Color no reconocido:", color);
      }
    }
  
    comenzarCiclo() {
      this.intervalo = setInterval(() => {
        this.cambiarEstado();
      }, 3000);
    }
  }
  
  // Inicialización
  document.addEventListener("DOMContentLoaded", () => {
    const semaforo = new ControlSemaforo("luz-roja", "luz-amarilla", "luz-verde");
  });
  