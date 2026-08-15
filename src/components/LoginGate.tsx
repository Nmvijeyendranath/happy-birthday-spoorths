import { useState, useEffect, useRef } from 'react';
import '../LoginGate.css';

import mangoImg from '../../assets/Mango.png';
import horseImg from '../../assets/Valentine Horse.png';
import moneyImg from '../../assets/money.png';
import pineappleImg from '../../assets/pineapple.png';
import catImg from '../../assets/Cute Hanging Orange Cat.png';
import fateImg from '../../assets/star_6506977.png';
import strawberryImg from '../../assets/strawberry_12924811.png';
import dogImg from '../../assets/dog_15996135.png';
import godImg from '../../assets/jesus.png';
import appleImg from '../../assets/apple-fruit.png';
import birdImg from '../../assets/pigeon.png';
import luckImg from '../../assets/clover.png';

const OPTIONS = [
  { label: 'Mango', icon: mangoImg, group: 'fruit', correct: false },
  { label: 'Horses', icon: horseImg, group: 'animal', correct: true },
  { label: 'Money', icon: moneyImg, group: 'trust', correct: false },
  { label: 'Pineapple', icon: pineappleImg, group: 'fruit', correct: true },
  { label: 'Cats', icon: catImg, group: 'animal', correct: false },
  { label: 'Fate', icon: fateImg, group: 'trust', correct: false },
  { label: 'Strawberry', icon: strawberryImg, group: 'fruit', correct: false },
  { label: 'Dogs', icon: dogImg, group: 'animal', correct: false },
  { label: 'God', icon: godImg, group: 'trust', correct: true },
  { label: 'Apple', icon: appleImg, group: 'fruit', correct: false },
  { label: 'Birds', icon: birdImg, group: 'animal', correct: false },
  { label: 'Luck', icon: luckImg, group: 'trust', correct: false },
];

const WRONG_LINES = [
  "hmm, that's not her ~ one more try",
  "almost! guess again",
  "nope, but you're getting warmer"
];
const RIGHT_LINES = [
  "yes — exactly her ~",
  "you know her so well",
  "just like that",
  "she'd smile at this one"
];

interface Props {
  onComplete: () => void;
}

export default function LoginGate({ onComplete }: Props) {
  const [solved, setSolved] = useState({ fruit: false, animal: false, trust: false });
  const [optStatus, setOptStatus] = useState<Record<number, 'correct' | 'wrong' | 'locked'>>({});
  const [whisper, setWhisper] = useState({ text: '', good: false, show: false });
  const [phase, setPhase] = useState<'picking' | 'closing' | 'clouds' | 'rays' | 'angel' | 'invite' | 'mainSite' | 'diving'>('picking');
  const [ripples, setRipples] = useState<Record<string, { id: number, x: number, y: number, size: number }[]>>({});
  const whisperTimeout = useRef<NodeJS.Timeout | null>(null);

  const [puffs, setPuffs] = useState<{ size: number, left: number, top: number, delay1: number, delay2: number }[]>([]);
  const [rays, setRays] = useState<{ left: number, rotate: number, delay: number }[]>([]);

  const solvedCount = Object.values(solved).filter(Boolean).length;
  const isUnlocked = solvedCount === 3;
  const sunTop = 14 + solvedCount * 13;

  const addRipple = (id: string, e: React.MouseEvent | React.TouchEvent, rect: DOMRect) => {
    const size = Math.max(rect.width, rect.height);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    const x = clientX - rect.left - size / 2;
    const y = clientY - rect.top - size / 2;
    const rippleId = Date.now();

    setRipples(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), { id: rippleId, x, y, size }]
    }));

    setTimeout(() => {
      setRipples(prev => ({
        ...prev,
        [id]: prev[id]?.filter(r => r.id !== rippleId) || []
      }));
    }, 500);
  };

  const showWhisper = (text: string, good: boolean) => {
    setWhisper({ text, good, show: true });
    if (whisperTimeout.current) clearTimeout(whisperTimeout.current);
    if (!good) {
      whisperTimeout.current = setTimeout(() => {
        setWhisper(prev => ({ ...prev, show: false }));
      }, 2000);
    }
  };

  const handleOptClick = (opt: typeof OPTIONS[0], index: number, e: React.MouseEvent) => {
    if (solved[opt.group as keyof typeof solved]) return;

    const el = e.currentTarget;
    addRipple(`opt-${index}`, e, el.getBoundingClientRect());

    if (opt.correct) {
      setOptStatus(prev => {
        const next = { ...prev, [index]: 'correct' as const };
        OPTIONS.forEach((o, i) => {
          if (o.group === opt.group && i !== index) {
            next[i] = 'locked';
          }
        });
        return next;
      });
      setSolved(prev => ({ ...prev, [opt.group]: true }));
      showWhisper(RIGHT_LINES[Math.floor(Math.random() * RIGHT_LINES.length)], true);
    } else {
      setOptStatus(prev => ({ ...prev, [index]: 'wrong' }));
      setTimeout(() => {
        setOptStatus(prev => {
          if (prev[index] === 'wrong') {
            const next = { ...prev };
            delete next[index];
            return next;
          }
          return prev;
        });
      }, 400);
      showWhisper(WRONG_LINES[Math.floor(Math.random() * WRONG_LINES.length)], false);
    }
  };

  const handleUnlockClick = (e: React.MouseEvent) => {
    if (!isUnlocked) return;
    addRipple('unlock', e, e.currentTarget.getBoundingClientRect());
    setPhase('closing');

    setTimeout(() => {
      setPhase('clouds');
      // Generate clouds
      const newPuffs = Array.from({ length: 16 }).map(() => ({
        size: 90 + Math.random() * 160,
        left: Math.random() * 100,
        top: Math.random() * 90,
        delay1: Math.random() * 0.6,
        delay2: 1.6 + Math.random() * 1
      }));
      setPuffs(newPuffs);
    }, 350);

    setTimeout(() => {
      setPhase('rays');
      const newRays = Array.from({ length: 10 }).map(() => ({
        left: 35 + Math.random() * 30,
        rotate: -20 + Math.random() * 40,
        delay: Math.random() * 0.5
      }));
      setRays(newRays);
    }, 900);

    setTimeout(() => setPhase('angel'), 1300);
    setTimeout(() => setPhase('invite'), 2100);
  };

  const handleEnterClick = (e: React.MouseEvent) => {
    addRipple('enter', e, e.currentTarget.getBoundingClientRect());
    setPhase('mainSite');

    // 2.5s hold, then cool Deep Dive transition
    setTimeout(() => {
      setPhase('diving');
      // Transition takes 1.5s as per CSS, then call onComplete
      setTimeout(() => {
        onComplete();
      }, 1500);
    }, 2500);
  };

  const renderRipples = (id: string) => (
    ripples[id]?.map(r => (
      <span
        key={r.id}
        className="ripple"
        style={{ width: r.size, height: r.size, left: r.x, top: r.y }}
      />
    ))
  );

  const veilClasses = ['cloud-veil'];
  if (['clouds', 'rays', 'angel', 'invite'].includes(phase)) veilClasses.push('show');

  const showAngel = ['angel', 'invite'].includes(phase);
  const showInvite = phase === 'invite';
  const showMainSite = phase === 'mainSite' || phase === 'diving';

  return (
    <div className={`login-gate-container ${phase === 'diving' ? 'diving' : ''}`}>
      {/* GATE */}
      <div className="gate" id="gateScene" style={{ opacity: showMainSite ? 0 : 1 }}>
        <div className="sun" style={{ top: `${phase === 'closing' ? 58 : sunTop}%` }}></div>
        <div className="horizon-line"></div>
        <div className="bird" style={{ top: '12%', animationDuration: '24s' }}>〜〜</div>
        <div className="bird" style={{ top: '18%', animationDuration: '32s', animationDelay: '-10s' }}>〜</div>
        <div className="silhouette"></div>

        <div className="stage">
          <div className={`card ${phase !== 'picking' ? 'closing' : ''}`}>
            <div className="eyebrow">Private Access</div>
            <h1 className="title">Spoorthi</h1>
            <p className="subtitle">for you, and only you</p>

            <div className="trait-dots">
              <div className={`trait-dot ${solved.fruit ? 'solved' : ''}`}>🍍</div>
              <div className={`trait-dot ${solved.animal ? 'solved' : ''}`}>🐴</div>
              <div className={`trait-dot ${solved.trust ? 'solved' : ''}`}>🙏</div>
            </div>

            <p className="field-intro">pick what feels like her ~</p>

            <div className="field">
              {OPTIONS.map((opt, i) => {
                const status = optStatus[i];
                const className = `opt ${status || ''}`;
                return (
                  <div
                    key={i}
                    className={className}
                    style={{ animationDelay: `-${i * 0.4}s` }}
                    onClick={(e) => handleOptClick(opt, i, e)}
                  >
                    <span className="opt-icon mb-1">
                      <img src={opt.icon} alt={opt.label} className="w-8 h-8 object-contain" />
                    </span>
                    {opt.label}
                    {renderRipples(`opt-${i}`)}
                  </div>
                );
              })}
            </div>

            <div className={`whisper ${whisper.good ? 'good' : ''} ${whisper.show ? 'show' : ''}`}>
              {whisper.text}
            </div>

            <div className={`final-note ${isUnlocked ? 'show' : ''}`}>
              every choice, unmistakably her.
            </div>

            <button
              className={`unlock-btn ${isUnlocked ? 'ready' : ''}`}
              onClick={handleUnlockClick}
            >
              Unlock
              {renderRipples('unlock')}
            </button>
          </div>
        </div>
      </div>

      {/* CLOUD + ANGEL TRANSITION */}
      <div className={veilClasses.join(' ')}>
        <div>
          {puffs.map((p, i) => (
            <div
              key={i}
              className="puff sway"
              style={{
                width: p.size,
                height: p.size * 0.6,
                left: `${p.left}vw`,
                top: `${p.top}vh`,
                animationDelay: `${p.delay1}s, ${p.delay2}s`
              }}
            />
          ))}
        </div>
        <div>
          {rays.map((r, i) => (
            <div
              key={i}
              className="ray on"
              style={{
                left: `${r.left}%`,
                transform: `rotate(${r.rotate}deg)`,
                animationDelay: `${r.delay}s`
              }}
            />
          ))}
        </div>
        <div className={`angel-wrap ${showAngel ? 'show' : ''}`}>
          <div className="halo-glow"></div>
          <svg className="angel-svg" viewBox="0 0 200 230" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="100" cy="26" rx="30" ry="8" fill="none" stroke="#e3a857" strokeWidth="2.5" opacity="0.9" />
            <path d="M100 60 C60 75 42 105 55 130 C40 128 22 112 18 92 C30 100 40 96 44 88 C36 82 30 70 32 56 C44 66 55 66 60 58 C66 48 80 44 100 60 Z" fill="#f6efe4" opacity="0.92" />
            <path d="M100 60 C140 75 158 105 145 130 C160 128 178 112 182 92 C170 100 160 96 156 88 C164 82 170 70 168 56 C156 66 145 66 140 58 C134 48 120 44 100 60 Z" fill="#f6efe4" opacity="0.92" />
            <circle cx="100" cy="52" r="19" fill="#fff6e2" />
            <path d="M78 95 C78 78 88 68 100 68 C112 68 122 78 122 95 L128 190 C128 205 116 216 100 216 C84 216 72 205 72 190 Z" fill="#f6efe4" />
            <path d="M100 68 C112 68 122 78 122 95 L126 175 L100 175 Z" fill="rgba(227,168,87,0.18)" />
          </svg>
        </div>
        <div className={`invite-wrap ${showInvite ? 'show' : ''}`}>
          <h2>Come in, Spoorthi</h2>
          <p>everything past this light was made only for you.</p>
          <button className="enter-btn" onClick={handleEnterClick}>
            Enter
            {renderRipples('enter')}
          </button>
        </div>
      </div>

      {/* MAIN SITE REVEAL (Spoorthi's Ocean) */}
      <div className={`main-site ${showMainSite ? 'show' : ''}`}>
        <div className="sun"></div>
        <div className="eyebrow">Welcome</div>
        <h1>Spoorthi's Ocean</h1>
        <p className="tag">A quiet stretch of shoreline, made just for her.</p>
      </div>
    </div>
  );
}
