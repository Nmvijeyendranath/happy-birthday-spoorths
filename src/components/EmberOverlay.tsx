import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function EmberOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0, DPR = 1;
    const embers: any[] = [];
    const smokes: any[] = [];
    const ripples: any[] = [];
    const sparks: any[] = [];
    let last = 0;
    let animFrameId: number;
    let isRunning = true;

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width = Math.round(W * DPR);
      canvas!.height = Math.round(H * DPR);
      canvas!.style.width = W + 'px';
      canvas!.style.height = H + 'px';
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
      rebalance();
    }

    function rebalance() {
      const target = Math.max(50, Math.min(140, Math.round((W * H) / 14000)));
      while (embers.length < target) spawnEmber(false);
      while (embers.length > target) embers.pop();
    }

    function spawnEmber(reset: boolean) {
      embers.push({
        x: Math.random() * W,
        y: reset ? H + 10 + Math.random() * 60 : Math.random() * H,
        r: 0.7 + Math.random() * 1.5,
        speed: 0.15 + Math.random() * 0.5,
        wob: Math.random() * Math.PI * 2,
        wobSpd: 0.012 + Math.random() * 0.035,
        wobAmp: 8 + Math.random() * 30,
        ph: Math.random() * Math.PI * 2,
        flick: 0.5 + Math.random() * 0.5,
        hue: 10 + Math.random() * 24,
      });
    }

    function spawnSmoke() {
      smokes.push({
        x: Math.random() * W,
        y: H * 0.3 + Math.random() * H * 0.6,
        r: 70 + Math.random() * 140,
        drift: (0.08 + Math.random() * 0.25) * (Math.random() < 0.5 ? -1 : 1),
        ph: Math.random() * Math.PI * 2,
      });
    }

    for (let i = 0; i < 9; i++) spawnSmoke();

    function spawnTouch(x: number, y: number) {
      ripples.push({ x, y, t: 0, dur: 1.5, maxR: 55 + Math.random() * 85 });
      const n = 16 + Math.floor(Math.random() * 10);
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = 0.7 + Math.random() * 2.4;
        sparks.push({
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp - 1.3,
          life: 0,
          max: 0.7 + Math.random() * 0.9,
          r: 0.8 + Math.random() * 1.4,
          hue: 15 + Math.random() * 20,
        });
      }
    }

    function onTap(e: MouseEvent | TouchEvent) {
      if (reduceMotion) return;
      let x = 0, y = 0;
      if (e instanceof MouseEvent) {
        x = e.clientX;
        y = e.clientY;
      } else if (window.TouchEvent && e instanceof TouchEvent && e.touches[0]) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      }
      spawnTouch(x, y);
    }

    if (window.PointerEvent) {
      window.addEventListener('pointerdown', onTap as any, { passive: true });
    } else {
      window.addEventListener('mousedown', onTap as any);
      window.addEventListener('touchstart', onTap as any, { passive: true });
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, W, H);
      const g = ctx!.createRadialGradient(W * 0.5, H * 1.02, 0, W * 0.5, H * 1.02, H * 0.75);
      g.addColorStop(0, 'rgba(255,110,20,0.12)');
      g.addColorStop(0.6, 'rgba(120,45,10,0.04)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx!.fillStyle = g;
      ctx!.fillRect(0, 0, W, H);
    }

    function frame(now: number) {
      if (!isRunning) return;
      animFrameId = requestAnimationFrame(frame);
      if (reduceMotion) return;

      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      ctx!.clearRect(0, 0, W, H);

      ctx!.globalCompositeOperation = 'source-over';
      for (const s of smokes) {
        s.x += s.drift * dt * 30;
        s.ph += dt * 0.4;
        if (s.x < -s.r) s.x = W + s.r;
        if (s.x > W + s.r) s.x = -s.r;
        const g = ctx!.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r);
        g.addColorStop(0, 'rgba(255,120,40,0.05)');
        g.addColorStop(0.6, 'rgba(80,45,22,0.035)');
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      const breath = 0.5 + 0.5 * Math.sin(performance.now() / 1400);
      const glow = ctx!.createRadialGradient(W * 0.5, H * 1.02, 0, W * 0.5, H * 1.02, H * 0.75);
      glow.addColorStop(0, 'rgba(255,110,20,' + (0.11 + 0.07 * breath) + ')');
      glow.addColorStop(0.5, 'rgba(120,45,10,0.05)');
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx!.fillStyle = glow;
      ctx!.fillRect(0, 0, W, H);

      ctx!.globalCompositeOperation = 'lighter';
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.wob += e.wobSpd * dt * 60;
        e.ph += dt * (1.6 + Math.random());
        e.x += Math.sin(e.wob) * e.wobAmp * 0.02 * dt * 60;
        e.y -= e.speed * dt * 60;
        if (e.y < -30 || e.x < -40 || e.x > W + 40) {
          e.x = Math.random() * W;
          e.y = H + 10 + Math.random() * 50;
        }
        const f = 0.6 + 0.4 * Math.sin(e.ph);
        const rr = e.r * 6;
        const g = ctx!.createRadialGradient(e.x, e.y, 0, e.x, e.y, rr);
        g.addColorStop(0, 'hsla(' + e.hue + ',100%,96%,' + 0.5 * e.flick * f + ')');
        g.addColorStop(0.35, 'hsla(' + e.hue + ',100%,58%,' + 0.3 * e.flick * f + ')');
        g.addColorStop(1, 'hsla(' + e.hue + ',100%,42%,0)');
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(e.x, e.y, rr, 0, Math.PI * 2);
        ctx!.fill();
      }

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life += dt;
        if (s.life >= s.max) {
          sparks.splice(i, 1);
          continue;
        }
        const k = s.life / s.max;
        s.x += s.vx * dt * 60;
        s.y += s.vy * dt * 60;
        s.vy += 0.05 * dt * 60;
        s.vx *= 1 - 0.6 * dt;
        const a = (1 - k) * (1 - k) * 0.9;
        const g = ctx!.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 5);
        g.addColorStop(0, 'hsla(' + s.hue + ',100%,96%,' + a + ')');
        g.addColorStop(0.4, 'hsla(' + s.hue + ',100%,55%,' + a * 0.4 + ')');
        g.addColorStop(1, 'hsla(' + s.hue + ',100%,40%,0)');
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r * 5, 0, Math.PI * 2);
        ctx!.fill();
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.t += dt;
        if (r.t >= r.dur) {
          ripples.splice(i, 1);
          continue;
        }
        const k = r.t / r.dur;
        const ease = 1 - Math.pow(1 - k, 2.4);
        const rad = 4 + ease * r.maxR;
        const a = (1 - k) * (1 - k) * 0.32;

        ctx!.save();
        ctx!.strokeStyle = 'rgba(255,150,70,' + a + ')';
        ctx!.lineWidth = 1.4 * (1 - k) + 0.4;
        ctx!.shadowColor = 'rgba(255,120,40,0.8)';
        ctx!.shadowBlur = 14;
        ctx!.beginPath();
        ctx!.arc(r.x, r.y, rad, 0, Math.PI * 2);
        ctx!.stroke();
        ctx!.restore();

        const gg = ctx!.createRadialGradient(r.x, r.y, 0, r.x, r.y, rad);
        gg.addColorStop(0, 'rgba(255,140,60,0)');
        gg.addColorStop(0.85, 'rgba(255,140,60,0.05)');
        gg.addColorStop(1, 'rgba(255,150,70,0.16)');
        ctx!.fillStyle = gg;
        ctx!.beginPath();
        ctx!.arc(r.x, r.y, rad, 0, Math.PI * 2);
        ctx!.fill();
      }

      ctx!.globalCompositeOperation = 'source-over';
    }

    window.addEventListener('resize', resize);
    resize();

    if (reduceMotion) {
      drawStatic();
    } else {
      animFrameId = requestAnimationFrame((now) => {
        last = now;
        animFrameId = requestAnimationFrame(frame);
      });
    }

    return () => {
      isRunning = false;
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', resize);
      if (window.PointerEvent) {
        window.removeEventListener('pointerdown', onTap as any);
      } else {
        window.removeEventListener('mousedown', onTap as any);
        window.removeEventListener('touchstart', onTap as any);
      }
    };
  }, [reduceMotion]);

  return (
    <div
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-100 transition-opacity duration-[1.6s] ease-out"
      style={{
        background: `radial-gradient(95% 75% at 50% 112%, rgba(255,110,20,.16), transparent 60%),
                     radial-gradient(120% 110% at 50% 50%, transparent 42%, rgba(0,0,0,.5) 100%)`,
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.055]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
