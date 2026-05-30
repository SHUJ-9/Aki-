/* ── Photos, ML Section, Lightbox, Tilt, Reveal ─────── */

function buildPhotos() {
    document.getElementById('photoGrid').innerHTML = PHOTOS.map((p, i) => {
        const inner = p.src
            ? `<img src="${p.src}" alt="${p.title}" onerror="this.parentElement.innerHTML='<span class=ph-icon>${PH_EMOJI[i % PH_EMOJI.length]}</span>';">`
            : `<span class="ph-icon">${PH_EMOJI[i % PH_EMOJI.length]}</span>`;
        return `<div class="photo-card" onclick="openLB('${p.src}')">
            <div class="photo-ph">${inner}</div>
            <div class="photo-cap">
                <div class="cap-title">${p.title}</div>
                <div class="cap-desc">${p.desc}</div>
            </div>
        </div>`;
    }).join('');

    setupReveal('#photoGrid', '.photo-card');
    addTilt('.photo-card');
}

function buildGames() {
    document.getElementById('heroGrid').innerHTML = ML_HEROES.map(h => `
        <div class="hero-card" style="--hc1:${h.c1}">
            <span class="h-emoji">${h.emoji}</span>
            <div class="h-name">${h.name}</div>
            <div class="h-role">${h.role}</div>
            <span class="h-star">${h.star}</span>
        </div>`).join('');

    document.getElementById('mlGrid').innerHTML = ML_SHOTS.map(s => `
        <div class="ml-card" onclick="openLB('${s.src}')">
            <img src="${s.src}" alt="${s.cap}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
            <div class="ml-card-ph" style="display:none">📱</div>
            <div class="ml-card-cap">${s.cap}</div>
        </div>`).join('');

    setupReveal('#mlGrid', '.ml-card');
    addTilt('.ml-card', 8);
}

function openLB(src) {
    if (!src) return;
    document.getElementById('lb-img').src = src;
    document.getElementById('lb').classList.add('open');
}

function closeLB() {
    document.getElementById('lb').classList.remove('open');
}

document.getElementById('lb').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeLB();
});

function addTilt(sel, deg = 12) {
    document.querySelectorAll(sel).forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width - .5) * deg;
            const y = ((e.clientY - r.top) / r.height - .5) * deg;
            card.style.transform = `perspective(700px)rotateY(${x}deg)rotateX(${-y}deg)translateZ(8px)`;
            card.style.transition = 'none';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform .6s cubic-bezier(.22,1,.36,1),box-shadow .35s';
        });
    });
}

function setupReveal(container, items) {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.querySelectorAll(items).forEach((el, i) => {
                el.style.animationDelay = `${i * .055}s`;
                el.classList.add('reveal');
            });
            obs.unobserve(entry.target);
        });
    }, { threshold: .08 });

    const c = document.querySelector(container);
    if (c) obs.observe(c);
}

function showSec(name, btn) {
    document.querySelectorAll('.nb').forEach(b => b.classList.remove('on'));
    btn.classList.add('on');
    document.getElementById('sec-' + name).scrollIntoView({ behavior: 'smooth', block: 'start' });
}
