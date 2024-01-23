$(document).ready(() => {
    $.ajax({
        url: '/atom',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            const atomContainer = document.getElementById('atom-container');

            const entries = data.feed.entry;

            entries.forEach(entry => {
                const entryDiv = document.createElement('div');
                entryDiv.className = 'atom-entry';

                
                const titleContent = typeof entry.title === 'object' ? entry.title._ : entry.title;

                const title = document.createElement('h3');
                title.textContent = titleContent;
                entryDiv.appendChild(title);

                
                let imageUrl = '';

               
                if (entry.link && entry.link['media:content'] && entry.link['media:content']['media:thumbnail']) {
                    const thumbnails = entry.link['media:content']['media:thumbnail'];
                    if (thumbnails.length > 0 && thumbnails[0].$ && thumbnails[0].$.url) {
                        imageUrl = thumbnails[0].$.url;
                    }
                }

                
                if (imageUrl) {
                    const image = document.createElement('img');
                    image.src = imageUrl;
                    entryDiv.appendChild(image);
                }

                const link = document.createElement('a');
                link.href = entry.link.href;
                link.textContent = 'Read more';
                entryDiv.appendChild(link);

                atomContainer.appendChild(entryDiv);
            });
        },
        error: function (error) {
            console.error('Error al cargar el feed Atom:', error);
        }
    });
});