document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

    // const validUsername = 'admin';
    //const validPassword = 'admin';

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); 

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        console.log("Usuario: " + username  );
        console.log("Contraseña: " + password);

        window.location.href = '../dashboard/index.html';
    });
});
