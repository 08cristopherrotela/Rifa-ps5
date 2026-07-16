const contenedor = document.getElementById("numeros");
const vendidos = document.getElementById("vendidos");
const buscar = document.getElementById("buscar");

let vendidosLista = JSON.parse(localStorage.getItem("vendidos")) || [];

function actualizarContador() {
    vendidos.textContent = vendidosLista.length;
}

function guardar() {
    localStorage.setItem("vendidos", JSON.stringify(vendidosLista));
}

function crearNumeros() {
    contenedor.innerHTML = "";

    for (let i = 0; i < 2000; i++) {
        const numero = i.toString().padStart(4, "0");

        const boton = document.createElement("div");
        boton.className = "numero";
        boton.textContent = numero;

        if (vendidosLista.includes(numero)) {
            boton.classList.add("vendido");
        }

        boton.onclick = () => {
            if (vendidosLista.includes(numero)) {
                vendidosLista = vendidosLista.filter(n => n !== numero);
                boton.classList.remove("vendido");
            } else {
                vendidosLista.push(numero);
                boton.classList.add("vendido");
            }

            guardar();
            actualizarContador();
        };

        contenedor.appendChild(boton);
    }

    actualizarContador();
}

buscar.addEventListener("input", () => {
    const texto = buscar.value;

    document.querySelectorAll(".numero").forEach(n => {
        n.style.display = n.textContent.includes(texto) ? "block" : "none";
    });
});

crearNumeros();
