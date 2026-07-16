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
    const mensaje = `Hola, quiero reservar el número ${numero} de la rifa de la PS5`;
    const url = `https://wa.me/595983497255?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
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
