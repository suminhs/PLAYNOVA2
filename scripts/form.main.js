import Database from "./database.local.js";

const form = document.querySelector("form");
const inputsForm = form.querySelectorAll("input");
const button = document.querySelector(".form-button");
let data = {};

inputsForm.forEach((input) => handleInput(input));

function handleInput(input) {
  input.addEventListener("change", (event) => {
    const valueInput = event.target.value;
    const nameInput = event.target.name;

    data = { ...data, [nameInput]: valueInput };

    if (nameInput === "terms") {
      const checkbox = event.target.checked;

      button.disabled = !checkbox;
      button.classList.toggle("disable", !checkbox);
    }

    validInputs(valueInput, nameInput).forEach((result) => {
      const input = form.querySelector(`[name="${nameInput}"]`).parentElement;
      if (result.valid !== true) {
        const errorMessage = document.createElement("span");
        errorMessage.classList.add("error-message");
        errorMessage.textContent = result.valid;
        input.appendChild(errorMessage);
      } else {
        const parent = input;
        const errorMessage = parent.querySelector(".error-message");
        if (errorMessage) {
          parent.removeChild(errorMessage);
        }
        form.addEventListener("submit", handleSubmit);
      }
    });

  });
}

function validInputs(value, name) {
  const errors = [];
  let err;

  switch (name) {
    case "username":
      err =
        value.length >= 3
          ? true
          : "El nombre de usuario debe tener al menos 3 caracteres.";
      errors.push({
        valid: err,
        name: "username",
      });
      break;
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      err = emailRegex.test(value)
        ? true
        : "El correo electrónico no es válido.";
      errors.push({
        valid: err,
        name: "email",
      });
      break;
    case "password":
      const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

      regex.test(value);
      err = regex.test(value)
        ? true
        : "La contraseña debe contener al menos una letra mayúscula y un número.";
      errors.push({
        valid: err,
        name: "password",
      });
      break;
    case "date":
      err = validateAge(value) ? true : "Debes ser mayor de 18 años.";
      errors.push({
        valid: err,
        name: "date",
      });
      break;
    case "confirm-password":
      errors.push({
        valid: value === data.password ? true : "Las contraseñas no coinciden.",
        name: "confirm-password",
      });
      break;
  }
  return errors;
}

function validateAge(birthDateString) {
  const birthDate = new Date(birthDateString);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age >= 13;
}

function handleSubmit(event) {
  event.preventDefault();

  if (event.target !== form) return;

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  if (event.target.id === 'form-register') {
    const result = Database.addData(data, "users");
    if (!result) {
      button.disabled = true;
      button.classList.add("disable");
      return 
    } else {
      form.reset();
      window.location.href = "login.html";
    }
  } else {
    console.log(data);
    
  }
  
  
}
