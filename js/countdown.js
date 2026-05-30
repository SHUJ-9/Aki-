/* ── Countdown Timer + Confetti ─────────────────────── */

const prevV = { cD: '', cH: '', cM: '', cS: '' };

function startCountdown() {
    const bday = new Date('2020-01-01T00:00:00'); /* TEST — restore to 2026-06-01T00:00:00 */

    function tick() {
        const diff = bday - new Date();

        if (diff <= 0) {
            document.getElementById('cdBox').style.display = 'none';
            document.getElementById('bdayMsg').classList.add('show');
            document.getElementById('sec-photos').classList.add('sec-unlock');
            document.getElementById('sec-games').classList.add('sec-unlock');
            playMusic();
            startConfetti();
            return;
        }

        const vals = {
            cD: String(Math.floor(diff / 864e5)).padStart(2, '0'),
            cH: String(Math.floor(diff % 864e5 / 36e5)).padStart(2, '0'),
            cM: String(Math.floor(diff % 36e5 / 6e4)).padStart(2, '0'),
            cS: String(Math.floor(diff % 6e4 / 1e3)).padStart(2, '0'),
        };

        for (const [id, val] of Object.entries(vals)) {
            if (val !== prevV[id]) {
                const el = document.getElementById(id);
                el.classList.remove('flip');
                void el.offsetWidth;
                el.classList.add('flip');
                el.textContent = val;
                prevV[id] = val;
            }
        }
    }

    tick();
    setInterval(tick, 1000);
}

function burst() {
    for (let i = 0; i < 38; i++) {
        const el = document.createElement('div');
        el.className = 'cf';
        el.style.cssText = `left:${Math.random() * 100}vw;width:${Math.random() * 8 + 4}px;height:${Math.random() * 8 + 4}px;background:${CF_COLORS[~~(Math.random() * CF_COLORS.length)]};border-radius:${Math.random() > .5 ? '50%' : '2px'};animation-duration:${Math.random() * 3 + 2.5}s;animation-delay:${Math.random() * 1.5}s;`;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 5500);
    }
}

function startConfetti() {
    burst();
    const t = setInterval(burst, 2800);
    setTimeout(() => clearInterval(t), 25000);
}
