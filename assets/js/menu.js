// Grab DOM refs
const overlay = document.getElementById('overlay');
const panneau = document.getElementById('panneau');
const btnFermer = document.getElementById('fermer');

// Defensive: ensure elements exist
if (!overlay || !panneau || !btnFermer) {
    console.error('[menu] Missing DOM elements. Check IDs: overlay, panneau, fermer.');
}

/** Open the menu overlay */
function ouvrirPanneau() {
    // Add "open" styles/state
    overlay.classList.add('ouvert');
    document.body.classList.add('no-scroll');
    overlay.setAttribute('aria-hidden', 'false');

    // Focus the panel so ESC works and for accessibility
    if (panneau && typeof panneau.focus === 'function') {
        panneau.focus();
    }
}

/** Close the menu overlay */
function fermerPanneau() {
    overlay.classList.remove('ouvert');
    document.body.classList.remove('no-scroll');
    overlay.setAttribute('aria-hidden', 'true');
}

// Close when clicking outside the panel
overlay.addEventListener('click', (e) => {
    // Only close if the direct click target is the overlay itself
    // (clicks inside the panel should NOT close)
    if (e.target === overlay) {
        fermerPanneau();
    }
});

// Close with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('ouvert')) {
        fermerPanneau();
    }
});

document.getElementById("btnStart").addEventListener("click", () => {
    const nb = parseInt(document.getElementById("nbPlayers").value, 10);
    if (nb < 2 || nb > 8) {
        alert("Number of players must be between 2 and 8.");
        return;
    }
    window.nbPlayers = nb;   // expose to sketch.js
    fermerPanneau();         // close menu
});

// Close with the button
btnFermer.addEventListener('click', fermerPanneau);

// Expose functions globally so p5.js can open/close the menu
window.openMenu = ouvrirPanneau;
window.closeMenu = fermerPanneau;

// Since the overlay starts opened in HTML, block body scroll right away
document.body.classList.add('no-scroll');