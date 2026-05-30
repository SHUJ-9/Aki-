/* ── App Bootstrap ──────────────────────────────────── */

spawnPetals();
spawnSparks();

if (sessionStorage.getItem('auth') === '1') {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('dash').style.display = 'block';
    initDash();
}
