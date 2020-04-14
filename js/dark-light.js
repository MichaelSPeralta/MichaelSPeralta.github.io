// Chequear estilo onload

function check() {
  if (localStorage.getItem("DarkTheme")) {
    document.getElementById("css-change").href = './styles/main-dark.css';
  } else {
    document.getElementById("css-change").href = './styles/main.css';
  }
}

// Cambiar a Dark

let noche = (document.getElementById("modoNocturno").onclick = function () {
  modoNocturno();
});

function modoNocturno() {
  let themeDark = document.getElementById("css-change").href = './styles/main-dark.css';
  localStorage.setItem("DarkTheme", themeDark);
}

// Cambiar a Light

let dia = (document.getElementById("modoDia").onclick = function () {
  modoDia();
});

function modoDia() {
  document.getElementById("css-change").href = './styles/main.css';
  localStorage.removeItem("DarkTheme");
}

// Función onload

function triggerOnLoad(){
  check();
  console.log("check() OK")

  setTimeout(() => {
    cargaVerMas();
    console.log("cargaVerMas() OK")
  }, 1000);
 
};