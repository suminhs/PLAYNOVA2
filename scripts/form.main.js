import Database from "./database.local.js";


const form = document.querySelector("form");
const inputsForm = form.querySelectorAll("input");
const button = document.querySelector(".form-button");
let data = {};


// función para mostrar validaciones usando clases de Bootstrap
function showValidation(input, message) {
// limpiar estados previos
input.classList.remove("is-valid", "is-invalid");


// eliminar mensajes previos
let feedback = input.parentElement.querySelector(".invalid-feedback");
if (feedback) feedback.remove();


if (message) {
input.classList.add("is-invalid");
feedback = document.createElement("div");
feedback.classList.add("invalid-feedback");
feedback.textContent = message;
input.parentElement.appendChild(feedback);
} else {
input.classList.add("is-valid");
}
}


// función para validar todo el formulario
function validateForm() {
let allValid = true;


inputsForm.forEach((input) => {
if (input.type !== "checkbox") {
const results = validInputs(input.value, input.name);
const firstError = results.find((r) => !r.valid);
showValidation(input, firstError ? firstError.message : null);


if (firstError) allValid = false;
}
});


// validar términos
const terms = form.querySelector("[name='terms']");
if (!terms.checked) allValid = false;


// habilitar o deshabilitar botón
button.disabled = !allValid;
}


// listener para inputs
inputsForm.forEach((input) => {
input.addEventListener("input", (event) => {
const valueInput = event.target.value;
const nameInput = event.target.name;
data = { ...data, [nameInput]: valueInput };
validateForm();
});
});


// listener para checkbox de términos
const terms = form.querySelector("[name='terms']");
if (terms) {
terms.addEventListener("change", validateForm);
}


// validación inicial
validateForm();