document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.getElementById("main-content");
    const profileMenu = document.getElementById("perfil-menu");

    const loadPage = async (page) => {
        try {
            const response = await fetch(`./pages/${page}.html`);
            if (!response.ok) {
                throw new Error(`No se pudo cargar la página ${page}`);
            }
            const content = await response.text();

            mainContent.innerHTML = content;

            loadPageScript(page);
        } catch (error) {
            mainContent.innerHTML = `<div class="error">Error al cargar la página: ${error.message}</div>`;
        }
    };

    const loadPageScript = (page) => {
        const scriptId = `${page}-script`;

        const existingScript = document.getElementById(scriptId);
        if (existingScript) {
            existingScript.remove(); 
        }

        const script = document.createElement("script");
        script.src = `./js/${page}.js`; 
        script.id = scriptId; 
        script.defer = true;
        document.body.appendChild(script);
    };

    loadPage("home");

    const menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((item) => {
        item.addEventListener("click", () => {
            const pageId = item.id; 
            loadPage(pageId);

            menuItems.forEach((el) => el.classList.remove("active"));
            item.classList.add("active");
        });
    });
    profileMenu.addEventListener("click", () => {
        loadPage("perfil-menu"); // Asumiendo que tienes un archivo perfil.html en la carpeta pages
        
        // Removemos la clase active de todos los items del menú
        menuItems.forEach((el) => el.classList.remove("active"));
    });
});
