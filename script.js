import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCwI0NV-1m41JG9bt-8Jg1CS-T-qoy_jok",
  authDomain: "rifa-ps5-61fd8.firebaseapp.com",
  projectId: "rifa-ps5-61fd8",
  storageBucket: "rifa-ps5-61fd8.firebasestorage.app",
  messagingSenderId: "512727339824",
  appId: "1:512727339824:web:e947e21c75472d14ca6ef5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const contenedor = document.getElementById("numeros");
const vendidos = document.getElementById("vendidos");
const buscar = document.getElementById("buscar");

let vendidosLista = [];

async function cargarReservas() {
  vendidosLista = [];

  const querySnapshot = await getDocs(collection(db, "reservas"));

  querySnapshot.forEach((doc) => {
    const datos = doc.data();
    vendidosLista.push(datos.Numero.toString().padStart(4, "0"));
  });

  crearNumeros();
}

function actualizarContador() {
  vendidos.textContent = vendidosLista.length;
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

  document.querySelectorAll(".numero").forEach((n) => {
    n.style.display = n.textContent.includes(texto) ? "block" : "none";
  });
});

cargarReservas().catch((error) => {
  console.error(error);
  alert(error.message);
  crearNumeros();
});
