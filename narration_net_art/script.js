
            function showImage(imageName) {
                // Créer un conteneur pour l'image
                const container = document.getElementById('left-text');
                container.innerHTML = ''; // Supprimer tout texte existant
                img.src = "src/img/" + imageName;                img.src = imageName; // Spécifiez le chemin de l'image
                container.appendChild(img);
            }

            function showText(text) {
                let textElement = document.getElementById("left-text");
                
                // On s'assure que le texte reste bien formaté
                textElement.innerHTML = `<p style="margin: 0; padding: 10px;">${text}</p>`;
            }
            
        
        function showContent(image) {
            let textElement = document.getElementById("left-text");
        
            if (textElement.dataset.state === "image") {
                textElement.innerHTML = "DEREALISATION."; // Remet le texte d'origine
                textElement.dataset.state = "text";
            } else {
                textElement.innerHTML = `<img src="${image}" style="max-width: 100%; height: auto; display: block; margin: auto;">`;
                textElement.dataset.state = "image";
            }
        }
        
        