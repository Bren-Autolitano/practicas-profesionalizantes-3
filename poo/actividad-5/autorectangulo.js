// --- MODELO ---
class ApplicationModel extends EventTarget {
    constructor() {
        super();
        this.objects = new Map();
    }

    addObject(id, object) {
        if (this.objects.has(id)) {
            throw new Error("ID duplicado");
        }
        this.objects.set(id, object);
        this.dispatchEvent(new CustomEvent('modelchanged'));
    }

    getObject(id) {
        return this.objects.get(id);
    }

    getObjects() {
        return Array.from(this.objects.values());
    }
}

// --- FIGURAS ---
class Figura {
    constructor(id, color) {
        this.id = id;
        this.color = color;
        this.x = 0;
        this.y = 0;
    }
    draw(ctx) {}
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
}

class Rectangulo extends Figura {
    constructor(id, x, y, width, height, color) {
        super(id, color);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}

class Circulo extends Figura {
    constructor(id, x, y, radius, color) {
        super(id, color);
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }
}

class TrianguloEquilatero extends Figura {
    constructor(id, x, y, lado, color) {
        super(id, color);
        this.x = x;
        this.y = y;
        this.lado = lado;
    }
    draw(ctx) {
        const altura = (Math.sqrt(3) / 2) * this.lado;
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.lado / 2, this.y + altura);
        ctx.lineTo(this.x - this.lado / 2, this.y + altura);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }
}

// --- VISTA ---
class ApplicationView extends EventTarget {
    constructor() {
        super();

        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.tableBody = document.querySelector('#figureTable tbody');
        this.colorPicker = document.getElementById('colorPicker');

        this.btnRect = document.getElementById('btnRect');
        this.btnCircle = document.getElementById('btnCircle');
        this.btnTriangle = document.getElementById('btnTriangle');

        this.selectedFigureId = null;

        this._addListeners();
    }

    _addListeners() {
        this.btnRect.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('createfigure', { detail: { tipo: 'rectangulo' } }));
        });
        this.btnCircle.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('createfigure', { detail: { tipo: 'circulo' } }));
        });
        this.btnTriangle.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('createfigure', { detail: { tipo: 'triangulo' } }));
        });

        this.tableBody.addEventListener('change', e => {
            if (e.target && e.target.name === 'figuraSeleccionada') {
                this.selectedFigureId = e.target.value;
                this.dispatchEvent(new CustomEvent('figureselected', { detail: { id: this.selectedFigureId } }));
            }
        });
    }

    dibujarFiguras(figuras) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        figuras.forEach(fig => fig.draw(this.ctx));
    }

    actualizarTabla(figuras) {
        this.tableBody.innerHTML = '';
        figuras.forEach(fig => {
            const tr = document.createElement('tr');
            const tdId = document.createElement('td');
            tdId.textContent = fig.id;
            const tdTipo = document.createElement('td');
            tdTipo.textContent = fig.constructor.name;

            const tdRadio = document.createElement('td');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'figuraSeleccionada';
            radio.value = fig.id;
            if (this.selectedFigureId === fig.id) {
                radio.checked = true;
            }
            tdRadio.appendChild(radio);

            tr.appendChild(tdId);
            tr.appendChild(tdTipo);
            tr.appendChild(tdRadio);

            this.tableBody.appendChild(tr);
        });
    }

    getColor() {
        return this.colorPicker.value;
    }
}

// --- CONTROLADOR ---
class ApplicationController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.selectedFigure = null;

        this._bindEvents();
        this._bindKeyboard();
    }

    _bindEvents() {
        this.view.addEventListener('createfigure', e => this._onCreateFigure(e.detail.tipo));
        this.view.addEventListener('figureselected', e => this._onFigureSelected(e.detail.id));
        this.model.addEventListener('modelchanged', () => this._onModelChanged());
    }

    _bindKeyboard() {
        window.addEventListener('keydown', e => {
            if (!this.selectedFigure) return;

            let dx = 0, dy = 0;
            switch (e.key) {
                case 'ArrowUp': dy = -10; break;
                case 'ArrowDown': dy = 10; break;
                case 'ArrowLeft': dx = -10; break;
                case 'ArrowRight': dx = 10; break;
            }
            if (dx !== 0 || dy !== 0) {
                this.selectedFigure.move(dx, dy);
                this.view.dibujarFiguras(this.model.getObjects());
            }
        });
    }

    _onCreateFigure(tipo) {
        try {
            const id = prompt('Ingrese ID único de la figura:');
            if (!id || this.model.getObject(id)) {
                alert('ID inválido o duplicado.');
                return;
            }

            const color = this.view.getColor();

            let figura = null;

            if (tipo === 'rectangulo') {
                const x = parseInt(prompt('Posición X:'));
                const y = parseInt(prompt('Posición Y:'));
                const width = parseInt(prompt('Ancho:'));
                const height = parseInt(prompt('Alto:'));
                if ([x, y, width, height].some(v => isNaN(v))) {
                    alert('Valores inválidos.');
                    return;
                }
                figura = new Rectangulo(id, x, y, width, height, color);
            } else if (tipo === 'circulo') {
                const x = parseInt(prompt('Posición X:'));
                const y = parseInt(prompt('Posición Y:'));
                const radius = parseInt(prompt('Radio:'));
                if ([x, y, radius].some(v => isNaN(v))) {
                    alert('Valores inválidos.');
                    return;
                }
                figura = new Circulo(id, x, y, radius, color);
            } else if (tipo === 'triangulo') {
                const x = parseInt(prompt('Posición X:'));
                const y = parseInt(prompt('Posición Y:'));
                const lado = parseInt(prompt('Lado:'));
                if ([x, y, lado].some(v => isNaN(v))) {
                    alert('Valores inválidos.');
                    return;
                }
                figura = new TrianguloEquilatero(id, x, y, lado, color);
            }

            if (figura) {
                this.model.addObject(id, figura);
                this.selectedFigure = figura;
                this.view.selectedFigureId = id;
                this.view.actualizarTabla(this.model.getObjects());
                this.view.dibujarFiguras(this.model.getObjects());
            }
        } catch (error) {
            alert(error.message);
        }
    }

    _onFigureSelected(id) {
        this.selectedFigure = this.model.getObject(id);
    }

    _onModelChanged() {
        this.view.actualizarTabla(this.model.getObjects());
        this.view.dibujarFiguras(this.model.getObjects());
    }
}

// --- INICIO ---
window.onload = () => {
    const model = new ApplicationModel();
    const view = new ApplicationView();
    const controller = new ApplicationController(model, view);

    // Dibujo inicial vacío
    view.dibujarFiguras(model.getObjects());
};
