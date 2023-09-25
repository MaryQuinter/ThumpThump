const formulario = document.getElementById('formulario');
const artistasCards = document.querySelectorAll('.artista-card');

formulario.addEventListener('input', () => {
    const texto = formulario.value.toLowerCase();
    filtrarTarjetas(texto);
});

function filtrarTarjetas(texto) {
    artistasCards.forEach(card => {
        const nombreArtista = card.querySelector('.footer-img-artist strong').textContent.toLowerCase();
        if (nombreArtista.includes(texto)) {
            card.style.display = 'block'; // Mostrar tarjeta si coincide
        } else {
            card.style.display = 'none'; // Ocultar tarjeta si no coincide
        }
    });
}

