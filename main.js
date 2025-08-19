// logica del carrusel
const images = ["img/logo.jpg", "img/dbd.jpg", "img/gta.jpg", "img/valo.jpg"];
const bannerImg = document.getElementById("imageCarrusel");



let i = 0;

const interval = setInterval(() => {
  cambiarImagen();
}, 5000);

function cambiarImagen() {
  i = (i + 1) % images.length;
  bannerImg.src = images[i];
}
