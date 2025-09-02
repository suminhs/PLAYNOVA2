$(document).ready(function () {
    $("registroForm").submit(function (event) {
        $event.preventDegault();
        let isValid = true;
        
        $(".error-message").hide();
        $(".form-control, .form-select").removeClass("is-invalid");

        // Campos obligatorios
        const campos = ["#usuario, #correo, #contraseña, #repetircontraseña, #rol, #aceptarterminos"]
        const mensajes = [
            "Campo obligatorio.",
            "Correo obligatorio.",
            "Contraseña obligatoria.",
            "Contraseña obligatoria.",
            "Rol obligatorio",
            "Aceptar términos obligatorio."
        ];

        campos.forEach((campo, i) => {
            if ($(campo).val().trim() === "") {
                $(campo).addClass("is-invalid");
                $(campo).next(".error-message").text(mensajes[i]).show();
                isValid = false;
            }
        });

        if (isValid) {
            alert("Usuario resgistrado correctamente.");
            $("#registroForm")[0].reset();
        }
            // Validaciones de registro
                document.addEventListener("DOMContentLoaded", function () {
                    const form = document.querySelector("form");
                    const username = document.getElementById("username");
                    const email = document.getElementById("email");
                    const password = document.getElementById("password");
                    const confirmPassword = document.getElementById("confirmPassword");
                    const rol = document.getElementById("rol");
                    const terms = document.getElementById("terms");

            // Mostrar error
                    function setError(input, message) {
                    const errorDiv = input.parentElement.querySelector(".error-message");
                    errorDiv.textContent = message;
                    input.classList.add("is-invalid");
                    input.classList.remove("is-valid");
                    }

            // Limpiar error
                    function clearError(input) {
                    const errorDiv = input.parentElement.querySelector(".error-message");
                    errorDiv.textContent = "";
                    input.classList.remove("is-invalid");
                    input.classList.add("is-valid");
                    }

            // Validaciones
                    function validateUsername() {
                    const value = username.value.trim();
                    const regex = /^[a-zA-Z0-9]{3,}$/; 
                    if (!regex.test(value)) {
                        setError(username, "El usuario debe tener al menos 3 caracteres y solo letras/números.");
                        return false;
                    }
                    clearError(username);
                    return true;
                    }

                    function validateEmail() {
                    const value = email.value.trim();
                    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!regex.test(value)) {
                        setError(email, "Ingrese un correo electrónico válido.");
                        return false;
                    }
                    clearError(email);
                    return true;
                    }

                    function validatePassword() {
                    const value = password.value.trim();
                    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
                    if (!regex.test(value)) {
                        setError(password, "La contraseña debe tener mínimo 8 caracteres, mayúscula, minúscula, número y un símbolo.");
                        return false;
                    }
                    clearError(password);
                    return true;
                    }

                    function validateConfirmPassword() {
                    if (confirmPassword.value !== password.value || confirmPassword.value === "") {
                        setError(confirmPassword, "Las contraseñas no coinciden.");
                        return false;
                    }
                    clearError(confirmPassword);
                    return true;
                    }

                    function validateRol() {
                        if (rol.value === "") {
                        setError(rol, "Debe seleccionar un rol.");
                        return false;
                    }
                    clearError(rol);
                    return true;
                    }

                    function validateTerms() {
                        if (!terms.checked) {
                            alert("Debe aceptar los términos y condiciones.");
                            return false;
                    }
                    return true;
                    }

                // Validar en tiempo real
                username.addEventListener("input", validateUsername);
                email.addEventListener("input", validateEmail);
                password.addEventListener("input", validatePassword);
                confirmPassword.addEventListener("input", validateConfirmPassword);
                rol.addEventListener("change", validateRol);

                // Validar al enviar
                form.addEventListener("submit", function (e) {
                    e.preventDefault(); 
                    if (
                        validateUsername() &&
                        validateEmail() &&
                        validatePassword() &&
                        validateConfirmPassword() &&
                        validateRol() &&
                        validateTerms()
                    ) {
                        alert("Formulario válido. ¡Registro exitoso!");
                        form.submit(); 
                    }
                });
        });
    });
    
});