document.addEventListener("DOMContentLoaded", () => {
    const icons = document.querySelectorAll(".icon");
    
    // ✅ Déplacement des icônes (Drag & Drop)
    icons.forEach(icon => {
        icon.addEventListener("mousedown", (event) => {
            let shiftX = event.clientX - icon.getBoundingClientRect().left;
            let shiftY = event.clientY - icon.getBoundingClientRect().top;

            icon.style.position = "absolute";
            icon.style.zIndex = 1000;
            
            function moveAt(pageX, pageY) {
                icon.style.left = pageX - shiftX + "px";
                icon.style.top = pageY - shiftY + "px";
            }

            function onMouseMove(event) {
                moveAt(event.pageX, event.pageY);
            }

            document.addEventListener("mousemove", onMouseMove);

            icon.addEventListener("mouseup", () => {
                document.removeEventListener("mousemove", onMouseMove);
                icon.style.zIndex = "";
            }, { once: true });
        });

        icon.ondragstart = () => false; // ❌ Empêche le comportement par défaut du drag & drop

        // ✅ Double-clic pour ouvrir une page
        icon.addEventListener("dblclick", (event) => {
            event.preventDefault();
            event.stopPropagation();

            let iconName = icon.querySelector("p").textContent.toLowerCase().replace(/\s+/g, '');
            window.location.href = iconName + ".html";
        });
    });
});
