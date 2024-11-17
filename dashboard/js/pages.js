document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.getElementById("main-content");

    // Función para cargar y renderizar una página
    const loadPage = async (page) => {
        try {
            // Cargar el contenido de la página
            const response = await fetch(`./pages/${page}.html`);
            if (!response.ok) {
                throw new Error(`No se pudo cargar la página ${page}`);
            }
            const content = await response.text();

            // Insertar el contenido en el contenedor principal
            mainContent.innerHTML = content;

            // Cargar el archivo JS asociado (si existe)
            loadPageScript(page);
        } catch (error) {
            mainContent.innerHTML = `<div class="error">Error al cargar la página: ${error.message}</div>`;
        }
    };

    // Función para cargar el archivo JavaScript asociado
    const loadPageScript = (page) => {
        const scriptId = `${page}-script`;

        // Verificar si el script ya está cargado
        const existingScript = document.getElementById(scriptId);
        if (existingScript) {
            existingScript.remove(); // Eliminarlo para recargarlo
        }

        // Crear y cargar el nuevo script
        const script = document.createElement("script");
        script.src = `./js/${page}.js`; // Ruta del script
        script.id = scriptId; // Asignar un id único
        script.defer = true;
        document.body.appendChild(script);
    };

    // Inicializar con la página Home
    loadPage("home");

    const menuItems = document.querySelectorAll(".menu-item");
    // Configurar eventos para los elementos del menú
    menuItems.forEach((item) => {
        item.addEventListener("click", () => {
            const pageId = item.id; // Usar el id como nombre del archivo
            loadPage(pageId);

            // Resaltar el elemento activo en el menú
            menuItems.forEach((el) => el.classList.remove("active"));
            item.classList.add("active");
        });
    });
});
