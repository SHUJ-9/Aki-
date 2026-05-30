/* ── Login / Logout ─────────────────────────────────── */

function norm(s) {
    return s.trim().toUpperCase().replace(/\s+/g, ' ');
}

function doLogin() {
    const val = norm(document.getElementById('nameIn').value);
    const err = document.getElementById('errMsg');

    if (PASSWORDS.includes(val)) {
        const ls = document.getElementById('loginScreen');
        ls.style.opacity = '0';
        setTimeout(() => {
            ls.style.display = 'none';
            const d = document.getElementById('dash');
            d.style.cssText = 'display:block;opacity:0;transition:opacity .9s ease';
            requestAnimationFrame(() => requestAnimationFrame(() => { d.style.opacity = '1'; }));
            sessionStorage.setItem('auth', '1');
            initDash();
        }, 900);
    } else {
        err.textContent = "Hmm, that doesn't match! Try again 💕";
        err.style.animation = 'none';
        void err.offsetWidth;
        err.style.animation = 'shake .5s ease';
        const inp = document.getElementById('nameIn');
        inp.style.borderColor = '#ff8a80';
        setTimeout(() => { inp.style.borderColor = 'rgba(192,57,43,.3)'; }, 1200);
    }
}

function doLogout() {
    sessionStorage.removeItem('auth');
    document.getElementById('dash').style.display = 'none';
    const ls = document.getElementById('loginScreen');
    ls.style.cssText = 'display:flex;opacity:1';
    document.getElementById('nameIn').value = '';
    document.getElementById('errMsg').textContent = '';
    pauseMusic();
}

document.getElementById('nameIn').addEventListener('keydown', e => {
    if (e.key === 'Enter') doLogin();
});

document.getElementById('loginBtn').addEventListener('click', function (e) {
    doLogin();
    const r    = document.createElement('span');
    r.className = 'ripple';
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
    this.appendChild(r);
    setTimeout(() => r.remove(), 700);
});
