document.getElementById("form-login").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const usuarioIngresado = document.getElementById("loginUsuario").value;
    const passwordIngresado = document.getElementById("loginPassword").value;

    const usuarioRegistrado = localStorage.getItem("usuario");
    const passwordRegistrado = localStorage.getItem("password");

    const mensaje = document.getElementById("mensaje");

    if (usuarioIngresado === usuarioRegistrado && passwordIngresado === passwordRegistrado) {
        mensaje.textContent = "Inicio de sesión exitoso. ¡Bienvenido!";
        mensaje.style.color = "green";
        // Redirigir a otra página
        window.location.href = "dashboard/index.html";
    } else {
        mensaje.textContent = "Usuario o contraseña incorrectos.";
        mensaje.style.color = "red";
    }
});