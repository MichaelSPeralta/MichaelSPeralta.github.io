// Declaración de variables
var arrayGif = new Array();
var recorder; // globally accessible
var video = document.querySelector("video");
var image = document.getElementById("preview-img");

//FUNCION PARA CAPTURAR VIDEO
function getStreamAndRecord() {
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: true,
    })
    .then(function (stream) {
      video.srcObject = stream;
      video.play();
    });
  cancelGif();

  let openRecordWin = document.getElementById("record-win");
  openRecordWin.setAttribute("class", "win-capture");

  let galeria = document.getElementById("galeria-api");
  if (galeria.style.display === "none") {
    galeria.style.display = "block";
  } else {
    galeria.style.display = "none";
  }

  let mgi = document.getElementById("mis-gifos");
  if (mgi.style.display === "none") {
    mgi.style.display = "block";
  } else {
    mgi.style.display = "none";
  }
}

// Función para estilos cancelar carga GIF
function cancelGif() {
  let cancelGif = document.getElementById("cargaGif");
  cancelGif.setAttribute("class", "carga-none");
}

// RecordRTC
function captureCamera(callback) {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (camera) {
      callback(camera);
      console.log("Toma la Cámara");
    })
    .catch(function (error) {
      alert("Unable to capture your camera. Please check console logs.");
      console.error(error);
    });
}

document.getElementById("btn-start-recording").onclick = function () {
  this.disabled = true;

  captureCamera(function (camera) {
    recorder = RecordRTC(camera, {
      type: "gif",
      frameRate: 1,
      quality: 10,
      width: 838,
      hidden: 240,
      onGifRecordingStarted: function () {
        console.log("started");
      },
      onGifPreview: function (gifURL) {
        image.src = gifURL;
      },
    });

    recorder.startRecording();
    recorder.camera = camera;
    document.getElementById("btn-stop-recording").disabled = false;

    // Estilos botones
    document.getElementById("btn-stop-recording").setAttribute("class", "capture-active");
    document.getElementById("btn-start-recording").style.display = "none";

    // Cambio titulo de texto
    let title = (document.getElementById("record-title").innerHTML = "Capturando tu Gifo");

    // Interacción entre tags IMG - VIDEO
    let sourceImage = (document.getElementById("preview-img").style.display = "block");
    let sourceVideo = (document.getElementById("cont-vid").style.display = "none");

    // Timer
    var seconds = 0;
    var el = document.getElementById("seconds-counter");

    function myCounter() {
      el.innerText = ++seconds;
    }
    var cancel = setInterval(myCounter, 1000);
  });
};

// Boton LISTO (STOP RECORD)
document.getElementById("btn-stop-recording").onclick = function () {
  this.disabled = true;
  recorder.stopRecording(stopRecordingCallback);
  document.getElementById("btn-upload-record").style.display = "block";
  document.getElementById("btn-stop-recording").setAttribute("class", "capture-active-none");
  document.getElementById("repeat-capture").style.display = "block";
  document.getElementById("record-title").innerHTML = "Vista previa";
};

// Boton UPLOAD
document.getElementById("btn-upload-record").onclick = function () {
  document.getElementById("preview-img").style.display = "none";
  document.getElementById("upload-window").style.display = "flex";
  document.getElementById("repeat-capture").style.display = "none";
};

function stopRecordingCallback() {
  video.srcObject = null;
  image.src = URL.createObjectURL(recorder.getBlob());

  let form = new FormData();
  form.append("file", recorder.getBlob(), "myGif.gif");
  console.log(form.get("file"));

  // Boton Repetir captura
  document.getElementById("repeat-capture").addEventListener("click", () => {
    document.getElementById("record-win").setAttribute("class", "win-capture");
    document.getElementById("btn-start-recording").style.display = "flex";
    document.getElementById("repeat-capture").style.display = "none";
    document.getElementById("btn-upload-record").style.display = "none";
  });

  let btnUpload = document.getElementById("btn-upload-record");
  btnUpload.addEventListener("click", () => {
    console.log("Subiendo...");
    document.getElementById("record-title").innerHTML = "Subiendo tu GIFOS...";

    //animar la ProgressBar  en esta linea
    fetch(
      "https://upload.giphy.com/v1/gifs" +
        "?api_key=" +
        "znXEZG58twcEoPcbw5gG4a7F9I990uaL",
      {
        method: "POST",
        body: form,
      }
    )
      .then((res) => {
        console.log(res.status);
        if (res.status == 200) {
          console.log("Subida con exito!");
          document.getElementById('container-check-upload').style.display = "block";
        }
        return res.json();
      })
      .then((data) => {
        var dataId = data.data.id;
        fetch(
          "https://api.giphy.com/v1/gifs/" +
            dataId +
            "?api_key=" +
            "znXEZG58twcEoPcbw5gG4a7F9I990uaL"
        )
          .then((res) => {
            console.log(res.status);
            console.log(res);
            return res.json();
          })
          .then((data) => {
            localStorage.setItem("gifo" + data.data.id, JSON.stringify(data));
            document.getElementById("gif-get").src = data.data.images.fixed_height.url;
            document.getElementById("record-win").setAttribute("class", "win-capture-none");
            document.getElementById("boton-embeber").addEventListener("click", (file, text) => {
              navigator.clipboard.writeText(data.data.embed_url);
              copyModal.innerHTML = "Código copiado con éxito!"; 
              setTimeout(() => {
                copyModal.innerHTML = "";
              }, 3000);
            });
           
            console.log(data)
            console.log("Traigo GIF desde la api");
          })
          .catch((error) => {
            console.log("Error al traer el gifos desde GIPHY");
            console.error("Error:", error);
          });
      });
  });
  document.getElementById('img-pre').src = image.src;
  recorder.camera.stop();
  recorder.destroy();
  recorder = null;
}

//
// Download
function downloadFile(data, fileName, type="text/plain") {
  // Create an invisible A element
  const a = document.createElement("a");
  a.style.display = "none";
  document.body.appendChild(a);

  // Set the HREF to a Blob representation of the data to be downloaded
  a.href = window.URL.createObjectURL(
    new Blob(image.src, gif)
    
  );

  // Use download attribute to set set desired file name
  a.setAttribute("download", fileName);

  // Trigger the download by simulating click
  a.click();

  // Cleanup
  window.URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
}
//
//


// Traigo Gif desde el localStorage

function getItems() {
  let items = [];
  for (var i = 0; i < localStorage.length; i++) {
    let item = localStorage.getItem(localStorage.key(i));
    if (item.includes("data")) {
      itemJson = JSON.parse(item);
      items.push(itemJson.data.images.fixed_height.url);
    }
  }
  return items;
}

window.addEventListener("load", () => {
  let local = getItems();
  console.log("local");
  local.forEach((item) => {
    let img = document.createElement("img");
    img.src = item;
    console.log(img);

    let gifBox = document.createElement("div");
    gifBox.classList.add("mi-gifos-img");
    gifBox.appendChild(img);

    let galeriaApi = document.getElementById("galeria-api");
    galeriaApi.appendChild(gifBox);
  });
});

// Subida de GIFO con exito
document.getElementById("download-gif").addEventListener("click", (file, text) => {
  var element = document.createElement('a'); 
        element.setAttribute('href', 'data:text/plain;charset=utf-8, '  + encodeURIComponent(text)); 
        element.setAttribute('download', file); 
        document.body.appendChild(element);

        var text = document.getElementById("text"); 
                    var filename = "GFG.txt"; 
});

// Boton Listo
document.getElementById("listo-btn").addEventListener("click", () => {
  location.replace("http://127.0.0.1:5500/src/upload.html");
  let doc = document.getElementById('mis-gifos');
  doc.scrollIntoView();
});

document.getElementById('backtoindex').addEventListener('click', () => {
  location.replace("http://127.0.0.1:5500/src/index.html");
})

