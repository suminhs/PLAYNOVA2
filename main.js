// Carrusel en body
const images = ["img/logo.png", "img/dbd.png", "img/gta.png", "img/valo.png"];
const bannerImg = document.getElementById("imageCarrusel");



let i = 0;

const interval = setInterval(() => {
  cambiarImagen();
}, 5000);

function cambiarImagen() {
  i = (i + 1) % images.length;
  bannerImg.src = images[i];
}
