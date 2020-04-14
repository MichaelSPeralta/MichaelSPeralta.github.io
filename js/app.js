// API GIPHY

const formSearch = document.getElementById("form-search");
const inSearch = document.getElementById("in-search");
const out = document.getElementById("out");
const sugerencias = document.getElementById("galeria-sm");
const tendencias = document.getElementById("tendencias");
const apikey = "znXEZG58twcEoPcbw5gG4a7F9I990uaL";

formSearch.addEventListener("submit", function (e) {
  e.preventDefault();
  let inputSearch = inSearch.value;
  search(inputSearch);

  if (inputSearch !== "") {
    tendencias.style.display = "none";
  }
  document.getElementById("search-field").value = `Buscaste: ${inputSearch}`;
});

// Conexión a la APÏ, función search-input.

function search(inputSearch) {
  const url = `http://api.giphy.com/v1/gifs/search?q=${inputSearch}&api_key=${apikey}&limit=12`;

  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (json) {
      console.log(json);
      let outHtml = "";

      json.data.forEach(function (object) {
        // console.log(object.title);
        const objUrl = object.images.fixed_height.url;
        const title = object.title;

        outHtml += `
        <div class="window-search">
        <div class="image-sm">
            <img class="img-source" src="${objUrl}" alt="${title}">
        </div>
        <div id="window-inner" class="window-inner">
            <p>#${title}</p>
        </div>
    </div>
      `;
      });

      out.innerHTML = outHtml;
    })
    .catch(function (err) {
      console.log(err.messege);
    });
}

// Función para cargar imagenes seccion sugeridos.

function sugeridos() {
  const url = `http://api.giphy.com/v1/gifs/search?q=random&api_key=${apikey}&limit=4`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      // console.log(json);
      let galeriaHTML = "";

      json.data.forEach(function (object) {
        // console.log(object.title);
        const objUrl = object.images.fixed_height.url;
        const title = object.title;

        galeriaHTML += `
    <div class="win-sm">
    <div class="window-sm">
    <p>#${title}</p>
    <img src="./assets/close.svg" alt="">
    </div>
    <div class="image-sm">
    <img class="img-source more-search" src="${objUrl}" alt="${title}">  
    <button class="ver-mas">Ver mas...</button>
    </div>
</div>
    `;
      });
      sugerencias.innerHTML = galeriaHTML;
    })
    .catch(function (err) {
      console.log(err.messege);
    });
}

sugeridos();

// Función para cargar imagenes seccion tendencias.

function tendencia() {
  const url = `http://api.giphy.com/v1/gifs/search?q=russian&api_key=${apikey}&limit=12`;

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      // console.log(json);
      let galeriaHTML = "";

      json.data.forEach(function (object) {
        // console.log(object.title);
        const objUrl = object.images.fixed_height.url;
        const title = object.title;

        galeriaHTML += `
        <div class="window-tendencias">
        <div class="image-sm">
            <img class="img-source" src="${objUrl}" alt="${title}">
        </div>
        <div class="window-inner">
            <p>#${title}</p>
        </div>
    </div>
    `;
      });

      tendencias.innerHTML = galeriaHTML;
    })
    .catch(function (err) {
      console.log(err.messege);
    });
}

tendencia();

// Estilos Boton search-input

document.getElementById("in-search").addEventListener("click", () => {
  const y = document.activeElement.tagName;
  if (y) {
    document
      .getElementById("btn-search")
      .setAttribute("class", "button-svg-active");
  } else {
    document.getElementById("btn-search").setAttribute("class", "button-svg");
  }
});

document.getElementById("btn-search").addEventListener("click", () => {
  document.getElementById("res-bus").style.display = "none";
  out.scrollIntoView();
});
// Palabras random para buscar

function randomWords() {
  var lang = ["python", "javascript", "java", "ruby on rails", "c", "c++"];
  var dc = ["batman", "robin", "joker", "harley queen", "penguin", "riddler"];
  var sports = ["soccer", "basketball", "baseball", "golf", "poker", "chess"];

  var random = Math.floor(Math.random() * lang.length);
  var randomLang = lang[random];
  document.getElementById("myText").innerHTML = randomLang;

  var random2 = Math.floor(Math.random() * dc.length);
  var randomDc = dc[random2];
  document.getElementById("myText2").innerHTML = randomDc;

  var random3 = Math.floor(Math.random() * sports.length);
  var randomSports = sports[random3];
  document.getElementById("myText3").innerHTML = randomSports;
}

inSearch.addEventListener("click", () => {
  document.getElementById("res-bus").style.display = "flex";
  randomWords();
});

document.getElementById("myText").addEventListener("click", () => {
  document.getElementById("res-bus").style.display = "none";
  let text = document.getElementById("myText").textContent;
  let inputSearch = text;
  search(inputSearch);
  if (inputSearch !== "") {
    tendencias.style.display = "none";
  }
  document.getElementById("search-field").value = `Buscaste: ${inputSearch}`;

  out.scrollIntoView();
});

document.getElementById("myText2").addEventListener("click", () => {
  document.getElementById("res-bus").style.display = "none";
  let text = document.getElementById("myText2").textContent;
  let inputSearch = text;
  search(inputSearch);
  if (inputSearch !== "") {
    tendencias.style.display = "none";
  }
  document.getElementById("search-field").value = `Buscaste: ${inputSearch}`;

  out.scrollIntoView();
});

document.getElementById("myText3").addEventListener("click", () => {
  document.getElementById("res-bus").style.display = "none";
  let text = document.getElementById("myText3").textContent;
  let inputSearch = text;
  search(inputSearch);
  if (inputSearch !== "") {
    tendencias.style.display = "none";
  }
  document.getElementById("search-field").value = `Buscaste: ${inputSearch}`;

  out.scrollIntoView();
});


function cargaVerMas() {
  let button0 = document.getElementsByClassName("ver-mas")[0];
  button0.addEventListener('click', ()=>{
    let title0 = document.getElementsByClassName("more-search")[0].alt;
    let inputSearch0 = title0;
    if (inputSearch0 !== "") {
      tendencias.style.display = "none";
    }
    document.getElementById("search-field").value = `Buscaste: ${inputSearch0}`;
    out.scrollIntoView();
    search(inputSearch0);
  })
  let button1 = document.getElementsByClassName("ver-mas")[1];
  button1.addEventListener('click', ()=>{
    let title1 = document.getElementsByClassName("more-search")[1].alt;
    let inputSearch1 = title1;
    if (inputSearch1 !== "") {
      tendencias.style.display = "none";
    }
    document.getElementById("search-field").value = `Buscaste: ${inputSearch1}`;
    out.scrollIntoView();
    search(inputSearch1);
  })
  let button2 = document.getElementsByClassName("ver-mas")[2];
  button2.addEventListener('click', ()=>{
    let title2 = document.getElementsByClassName("more-search")[2].alt;
    let inputSearch2 = title2;
    if (inputSearch2 !== "") {
      tendencias.style.display = "none";
    }
    document.getElementById("search-field").value = `Buscaste: ${inputSearch2}`;
    out.scrollIntoView();
    search(inputSearch2);
    
  })
  let button3 = document.getElementsByClassName("ver-mas")[3];
  button3.addEventListener('click', ()=>{
    let title3 = document.getElementsByClassName("more-search")[3].alt;
    let inputSearch3 = title3;
    if (inputSearch3 !== "") {
      tendencias.style.display = "none";
    }
    document.getElementById("search-field").value = `Buscaste: ${inputSearch3}`;
    out.scrollIntoView();
    search(inputSearch3);
    
  })
}

