// Función para realizar la solicitud al servidor y mostrar las noticias
async function obtenerNoticias() {
    try {
        const response = await fetch('/rss');
        const noticias = await response.json();


        // Llamar a la función para renderizar las noticias en el DOM
        renderizarNoticias(noticias.rss.channel.item);
    } catch (error) {
        console.error('Error al obtener las noticias:', error);
    }
}


// Función para renderizar las noticias en el DOM
function renderizarNoticias(noticias) {
    const noticiasContainer = document.getElementById('noticias-container');


    noticias.forEach((noticia) => {
        const noticiaElement = document.createElement('div');


        noticiaElement.innerHTML = `
<h2>${noticia.title}</h2>
<p>${noticia.description}</p>
<p>Autor: ${noticia['dc:creator']}</p>
<a href="${noticia.link}" target="_blank">Leer más</a>
${obtenerImagen(noticia)}
<p>Fecha de publicación: ${noticia.pubDate}</p>
<hr>
`;


        noticiasContainer.appendChild(noticiaElement);
    });
}


// Función para obtener la URL de la imagen de la noticia
function obtenerImagen(noticia) {
    if (noticia.enclosure && noticia.enclosure.$.type.startsWith('image/')) {
        return `<img src="${noticia.enclosure.$.url}" alt="${noticia.title}">`;
    } else {
        return '';
    }
}


// Llamar a la función para obtener y mostrar las noticias al cargar la página
document.addEventListener('DOMContentLoaded', obtenerNoticias);


