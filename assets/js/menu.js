// Grab DOM refs
const overlay = document.getElementById('overlay');
const panneau = document.getElementById('panneau');
const btnFermer = document.getElementById('fermer');
const nbPlayersInput = document.getElementById("nbPlayers");
const btnStart = document.getElementById("btnStart");

// Optional small helper to toggle disabled state (and visuals)
function lockPlayersUI(locked) {
    // Disable/enable controls
    nbPlayersInput.disabled = locked;
    btnStart.disabled = locked;

    // Visual cue (optional)
    nbPlayersInput.style.opacity = locked ? '0.6' : '1';
    btnStart.style.opacity = locked ? '0.6' : '1';
    btnStart.style.cursor = locked ? 'not-allowed' : 'pointer';
}

// If already locked (menu reopened), reflect UI state
if (window.playersLocked) {
    if (typeof window.nbPlayers === 'number') {
        nbPlayersInput.value = String(window.nbPlayers);
    }
    lockPlayersUI(true);
}

// Start Game click
btnStart.addEventListener("click", () => {
    // Do nothing if already locked
    if (window.playersLocked) return;

    // Parse and validate
    const nb = parseInt(nbPlayersInput.value, 10);
    if (isNaN(nb) || nb < 2 || nb > 8) {
        alert("Number of players must be between 2 and 8.");
        return;
    }

    // Expose globally for p5.js
    window.nbPlayers = nb;

    // 🔒 Lock permanently for this run
    window.playersLocked = true;
    lockPlayersUI(true);

    if (window.setup) window.setup();

    // Close the overlay
    fermerPanneau();
});

// Ensure UI stays locked every time the menu opens again
const _openMenu = window.openMenu;
window.openMenu = function () {
    _openMenu?.();
    if (window.playersLocked) {
        nbPlayersInput.value = String(window.nbPlayers ?? nbPlayersInput.value);
        lockPlayersUI(true);
    }
};

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

// Close with the button
btnFermer.addEventListener('click', fermerPanneau);

// Expose functions globally so p5.js can open/close the menu
window.openMenu = ouvrirPanneau;
window.closeMenu = fermerPanneau;

// Since the overlay starts opened in HTML, block body scroll right away
document.body.classList.add('no-scroll');