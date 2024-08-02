// Función para guardar el contenido del texto editable
function saveText() {
    const editableTexts = document.querySelectorAll('.editable-text');
    editableTexts.forEach((element, index) => {
        localStorage.setItem(`editable-text-${index}`, element.innerHTML);
    });
}

// Función para cargar el contenido del texto editable
function loadText() {
    const editableTexts = document.querySelectorAll('.editable-text');
    editableTexts.forEach((element, index) => {
        const savedText = localStorage.getItem(`editable-text-${index}`);
        if (savedText) {
            element.innerHTML = savedText;
        }
    });
}

// Cargar el contenido cuando la página se carga
document.addEventListener('DOMContentLoaded', loadText);

// Guardar el contenido cuando se realiza un cambio
document.addEventListener('input', saveText);
// Inicializar el audio en la primera carga de la página
document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('background-music');

    // Iniciar la reproducción si no está ya en curso
    if (audio && audio.paused) {
        audio.play();
    }

    // Restaurar el tiempo de reproducción
    const savedTime = localStorage.getItem('audio-current-time');
    if (savedTime) {
        audio.currentTime = parseFloat(savedTime);
    }

    // Guardar el tiempo de reproducción antes de cambiar de página
    window.addEventListener('beforeunload', function () {
        localStorage.setItem('audio-current-time', audio.currentTime);
    });

    // Limpiar el estado del audio al final de la canción o cuando el usuario decida
    audio.addEventListener('ended', function () {
        // No es necesario aquí si se usa el atributo loop
        // localStorage.removeItem('audio-current-time');
    });

    // Función para cargar el texto almacenado
    function loadText(id) {
        const savedText = localStorage.getItem(id);
        if (savedText) {
            document.getElementById(id).textContent = savedText;
        }
    }

    // Función para guardar el texto
    function saveText(id) {
        const textElement = document.getElementById(id);
        if (textElement) {
            localStorage.setItem(id, textElement.textContent);
        }
    }

    // Cargar el texto al cargar la página
    const pageId = document.body.id; // Usamos el id del body para determinar la página
    if (pageId) {
        loadText(pageId);
    }

    // Guardar el texto antes de cambiar de página
    window.addEventListener('beforeunload', function () {
        if (pageId) {
            saveText(pageId);
        }
    });
});


