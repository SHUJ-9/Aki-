/* ── Music Controls ─────────────────────────────────── */

function playMusic() {
    const audio = document.getElementById('bgMusic');
    const btn   = document.getElementById('musicBtn');
    audio.volume = 0.35;
    audio.play().then(() => {
        btn.textContent = '♫ Music';
        btn.classList.remove('muted');
    }).catch(() => {});
}

function pauseMusic() {
    const audio = document.getElementById('bgMusic');
    audio.pause();
    const btn = document.getElementById('musicBtn');
    if (btn) { btn.textContent = '♪ Muted'; btn.classList.add('muted'); }
}

function toggleMusic() {
    const audio = document.getElementById('bgMusic');
    if (audio.paused) playMusic(); else pauseMusic();
}
