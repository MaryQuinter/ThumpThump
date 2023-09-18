const apiSection = document.getElementById('apiSection');
const videosContainer = apiSection.querySelector('#videosContainer');
const prevButton = apiSection.querySelector('#prevButton');
const nextButton = apiSection.querySelector('#nextButton');

const apiKey = 'AIzaSyBUelssn3G733BSsdMfy3TwBwYVPV8bW6k';
const channelId = 'UCLkAepWjdylmXSltofFvsYQ'; // ID del canal de BTS
const maxResultsPerPage = 16; // Cantidad de resultados por página
let pageToken = ''; // Token de la página actual

// Función para cargar y mostrar los videos
function loadVideos() {
    // Realiza una solicitud para obtener los videos del canal de BTS
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResultsPerPage}&pageToken=${pageToken}`)
        .then(response => response.json())
        .then(data => {
            // Limpia el contenedor de videos
            videosContainer.innerHTML = '';

            // Itera a través de los resultados y muestra los videos dentro de tarjetas
            data.items.forEach(item => {
                const videoId = item.id.videoId;
                const videoTitle = item.snippet.title;

                // Crea un contenedor div para la tarjeta del video
                const videoCard = document.createElement('div');
                videoCard.classList.add('video-card');

                // Crea un elemento iframe para mostrar el video de YouTube
                const videoElement = document.createElement('iframe');
                videoElement.src = `https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&showinfo=0`;
                videoElement.title = videoTitle;
                videoElement.width = '560'; // Ancho del video
                videoElement.height = '315'; // Altura del video
                videoElement.allowFullscreen = true;

                // Crea un párrafo para mostrar el título del video
                const videoTitleElement = document.createElement('p');
                videoTitleElement.textContent = videoTitle;

                // Agrega el iframe y el párrafo a la tarjeta del video
                videoCard.appendChild(videoElement);
                videoCard.appendChild(videoTitleElement);

                // Agrega la tarjeta del video al contenedor principal
                videosContainer.appendChild(videoCard);
            });

            // Actualiza el token de la próxima página
            pageToken = data.nextPageToken || '';
            videosContainer.setAttribute('data-prev-page-token', data.prevPageToken || '');

            // Habilita/deshabilita los botones "Anterior" y "Siguiente" según sea necesario
            prevButton.disabled = !data.prevPageToken;
            nextButton.disabled = !pageToken;
        })
        .catch(error => {
            console.error('Error al obtener datos del canal de BTS:', error);
        });
}

// Manejadores de eventos para los botones
prevButton.addEventListener('click', () => {
    // Retrocede a la página anterior
    pageToken = videosContainer.getAttribute('data-prev-page-token');
    loadVideos();
});

nextButton.addEventListener('click', () => {
    // Avanza a la próxima página
    loadVideos();
});

// Carga los primeros videos al cargar la página
loadVideos();

