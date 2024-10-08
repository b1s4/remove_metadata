// Lógica del modo oscuro
const moonIcon = document.getElementById('moonIcon');
const body = document.body;
const container = document.getElementById('container');
const title = document.getElementById('title');
const uploadButton = document.getElementById('uploadButton');
const downloadLink = document.getElementById('downloadLink');
const outputImage = document.getElementById('outputImage');
const instructions = document.getElementById('instructions');

moonIcon.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    container.classList.toggle('dark-mode');
    title.classList.toggle('dark-mode');
    uploadButton.classList.toggle('dark-mode');
    downloadLink.classList.toggle('dark-mode');
    outputImage.classList.toggle('dark-mode');
    instructions.classList.toggle('dark-mode');
});

// Lógica de la subida de archivo y eliminación de metadatos
document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.src = e.target.result;
        img.onload = function() {
            // Crear un canvas para redibujar la imagen sin metadatos
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            // Convertir el canvas a Blob y permitir su descarga
            canvas.toBlob(function(blob) {
                const url = URL.createObjectURL(blob);
                outputImage.src = url;
                outputImage.style.display = 'block';

                // Mantener el nombre original de la imagen
                const originalName = file.name.replace(/\.[^/.]+$/, ""); // Eliminar extensión
                const extension = file.name.split('.').pop(); // Obtener la extensión original
                downloadLink.href = url;
                downloadLink.download = `${originalName}_no_metadata.${extension}`;
                downloadLink.textContent = `Download ${originalName}_no_metadata.${extension}`;
                downloadLink.style.display = 'inline-block';
            }, 'image/jpeg');
        };
    };
    reader.readAsDataURL(file);
});
