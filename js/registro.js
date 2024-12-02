document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const nombreUsuario = document.getElementById("nombreUsuario").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const mensaje = document.getElementById("mensaje");

    if (password !== confirmPassword) {
        mensaje.textContent = "Las contraseñas no coinciden.";
        mensaje.style.color = "red";
        return;
    }

    localStorage.setItem("usuario", nombreUsuario);
    localStorage.setItem("password", password);

    mensaje.textContent = "Registro exitoso. Ahora puedes iniciar sesión.";
    mensaje.style.color = "green";
    document.getElementById("register-form").reset();
});