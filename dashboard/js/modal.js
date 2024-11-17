
// Manejo del modal manualmente
document.addEventListener("DOMContentLoaded", () => {
    const modalButton = document.getElementById("openModal");
    const modalElement = document.getElementById("exampleModal");

    if (modalButton && modalElement) {
        console.log("Modal inicializado correctamente");

        // Instancia de Bootstrap Modal
        const modalInstance = new bootstrap.Modal(modalElement);

        // Mostrar el modal al hacer clic en el botón
        modalButton.addEventListener("click", () => {
            console.log("Botón de modal presionado");
            modalInstance.show();
        });
    } else {
        console.error("Elementos del modal no encontrados en home.html");
    }
});
