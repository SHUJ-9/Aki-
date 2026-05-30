/* ── Petals, Sparks, initDash ───────────────────────── */

function spawnPetals() {
    const c = document.getElementById('petals');
    for (let i = 0; i < 22; i++) {
        const el = document.createElement('div');
        el.className = 'petal';
        el.style.cssText = `left:${Math.random() * 100}vw;animation-duration:${Math.random() * 8 + 7}s;animation-delay:${Math.random() * 14}s;`;
        if (i % 3 === 0) {
            const s = document.createElement('div');
            s.className = 'ps';
            s.style.transform = `rotate(${Math.random() * 360}deg)`;
            el.appendChild(s);
        } else {
            el.classList.add('pe');
            el.textContent = i % 2 === 0 ? '❤' : '🌹';
            el.style.fontSize = `${Math.random() * .7 + .85}rem`;
        }
        c.appendChild(el);
    }
}

function spawnSparks() {
    for (let i = 0; i < 20; i++) {
        const el = document.createElement('div');
        el.className = 'spark';
        const size = Math.random() * 3 + 1;
        el.style.cssText = `left:${Math.random() * 100}vw;bottom:${Math.random() * 15}vh;width:${size}px;height:${size}px;background:${Math.random() > .5 ? 'rgba(212,172,13,.8)' : 'rgba(245,183,177,.7)'};animation-duration:${Math.random() * 9 + 8}s;animation-delay:${Math.random() * 12}s;--dr:${(Math.random() - .5) * 90}px;`;
        document.body.appendChild(el);
    }
}

function initDash() {
    startCountdown();
    buildPhotos();
    buildGames();
}
