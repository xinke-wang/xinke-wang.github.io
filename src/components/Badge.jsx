import { useEffect, useRef, useState } from 'react';

// Award badges share gold + 🏆 and fire confetti on hover; recognition
// badges (Spotlight / Oral) are plain text chips. Colors live in CSS so
// dark mode can restyle them.
const BADGES = {
  'Spotlight':           { icon: null, confetti: false },
  'Oral':                { icon: null, confetti: false },
  'Distinguished Paper': { icon: '🏆', confetti: true },
  'Best Paper':          { icon: '🏆', confetti: true },
};

const CONFETTI_COLORS = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF'];

function Confetti({ active }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    if (!active) {
      cancelAnimationFrame(animRef.current);
      const c = canvasRef.current;
      if (c) c.getContext('2d').clearRect(0, 0, c.width, c.height);
      particles.current = [];
      return;
    }
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    particles.current = Array.from({ length: 48 }, () => ({
      x: c.width / 2 + (Math.random() - 0.5) * 40,
      y: c.height / 2,
      vx: (Math.random() - 0.5) * 5,
      vy: -(Math.random() * 4 + 2),
      size: Math.random() * 5 + 3,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      rotation: Math.random() * 360,
      rotV: (Math.random() - 0.5) * 8,
      life: 1,
      decay: Math.random() * 0.015 + 0.012,
    }));

    function draw() {
      ctx.clearRect(0, 0, c.width, c.height);
      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12; // gravity
        p.rotation += p.rotV;
        p.life -= p.decay;
        if (p.life <= 0) return;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
        ctx.restore();
      });
      particles.current = particles.current.filter((p) => p.life > 0);
      if (particles.current.length > 0) animRef.current = requestAnimationFrame(draw);
    }
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [active]);

  return <canvas ref={canvasRef} width={160} height={100} className="confetti-canvas" />;
}

export function Badge({ type }) {
  const b = BADGES[type];
  const [hov, setHov] = useState(false);
  if (!b) return null;

  const slug = type.toLowerCase().replace(/ /g, '-');
  return (
    <span className="badge-wrap">
      <span
        className={`badge badge-${slug}`}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {b.icon && <span className="badge-icon">{b.icon}</span>}
        {type}
      </span>
      {b.confetti && <Confetti active={hov} />}
    </span>
  );
}
