$(function () {
    let hamburger = document.getElementsByClassName('hamburger')[0];
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger-toggled');
        document.getElementsByClassName('options-popup-container')[0]
            .classList.toggle('is-active');

        setTimeout(toggleCanvasRendering, 400 * hamburger.classList.contains('hamburger-toggled'));
    });

    $('.content-wrapper').on('scroll', onScroll).on('click', (event) => {
        !["img"].includes(event.target.localName) && addASplash();
    });
});

function revealGeekHavenName() {
    document.getElementsByClassName('geekhaven-text-container')[0]
        .setAttribute('style', 'color: #ffff;' +
        'text-decoration-color: #ffff; font-size: 32px;' +
        'transform: translate(86px, 0px);');
}

function hideGeekHavenName() {
    document.getElementsByClassName('geekhaven-text-container')[0]
        .setAttribute('style', 'color: #fff0;' +
        'text-decoration-color: #fff0; font-size: 0;');
}
