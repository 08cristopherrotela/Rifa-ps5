const contenedor = document.getElementById("numeros");
const vendidos = document.getElementById("vendidos");
const buscar = document.getElementById("buscar");

let vendidosLista = [];

function actualizarContador() {
    vendidos.textContent = vendidosLista.length;
}

function crearNumeros() {
    contenedor.innerHTML = "";

    for (let i = 1; i <= 2000; i++) {
        const numero = i.toString().padStart(4, "0");

        const boton = document.createElement("div");
        boton.className = "numero";
        boton.textContent = numero;

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

    document.querySelectorAll(".numero").forEach((n) => {
        n.style.display = n.textContent.includes(texto) ? "block" : "none";
    });
});

crearNumeros();
