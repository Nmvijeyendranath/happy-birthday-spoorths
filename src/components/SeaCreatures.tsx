/** Realistic-ish SVG sea creatures used in the wish animation. */

export function Dolphin({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 140" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dBody" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor="#7aafc8" />
          <stop offset="35%" stopColor="#4a839e" />
          <stop offset="70%" stopColor="#2d5e78" />
          <stop offset="100%" stopColor="#163a4f" />
        </linearGradient>
        <linearGradient id="dBelly" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e4f1f7" />
          <stop offset="100%" stopColor="#a8cdd9" />
        </linearGradient>
        <radialGradient id="dHighlight" cx="40%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#aed4e6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#4a839e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="dFin" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#3d6a86" />
          <stop offset="100%" stopColor="#142e3e" />
        </linearGradient>
      </defs>
      {/* Shadow */} 
      <ellipse cx="120" cy="126" rx="60" ry="6" fill="#0a1f2e" opacity="0.3" /> 
      {/* Body */} 
      <path d="M28,61 C30,35 57,21 91,20 C125,18 154,28 170,48 C184,65 184,91 172,111 C165,123 157,132 151,137 C154,119 151,97 139,80 C126,62 108,53 89,52 C72,51 59,56 48,64 C40,70 32,72 28,69 C25,67 25,64 28,61 Z" fill="url(#dBody)" /> 
      {/* Body highlight */} 
      <path d="M60,50 C80,42 110,38 136,40 C155,42 170,48 180,56 C160,48 130,44 100,46 C80,48 66,50 60,50 Z" fill="url(#dHighlight)" /> 
      {/* Belly */} 
      <path d="M29,69 C44,65 55,56 72,54 C94,51 117,59 134,76 C147,90 153,111 151,137 C143,119 132,101 116,90 C98,78 78,73 59,75 C46,77 36,78 29,74 C26,73 26,71 29,69 Z" fill="url(#dBelly)" opacity="0.98" /> 
      {/* Dorsal fin */} 
      <path d="M108,23 C116,9 133,5 146,8 C135,13 126,20 121,29 C116,26 112,24 108,23 Z" fill="url(#dFin)" /> 
      {/* Dorsal fin edge highlight */} 
      <path d="M122,36 C128,20 142,10 154,10 C144,20 138,30 134,40 C130,38 126,37 122,36 Z" fill="#5a9ab5" opacity="0.3" /> 
      {/* Tail flukes */} 
      <path d="M151,136 C143,132 134,134 126,142 C137,143 145,146 151,151 C156,143 164,140 174,142 C167,134 159,131 151,136 Z" fill="url(#dFin)" /> 
      {/* Pectoral flipper */} 
      <path d="M82,78 C76,90 68,98 60,100 C66,92 72,84 78,78 Z" fill="#1c3d52" /> 
      {/* Flipper highlight */} 
      <path d="M80,78 C76,86 72,92 66,96 C70,88 74,82 78,78 Z" fill="#3a6d85" opacity="0.4" /> 
      {/* Eye */} 
      <circle cx="73" cy="48" r="3.2" fill="#091a24" /> 
      <circle cx="74" cy="47" r="1.2" fill="#fff" opacity="0.9" /> 
      <circle cx="72" cy="49" r="0.6" fill="#4a99b8" opacity="0.5" /> 
      {/* Open smiling mouth and rostrum */} 
      <path d="M28,66 C18,65 9,68 4,74 C14,73 21,76 29,74 C39,72 47,67 55,61 C45,64 36,66 28,66 Z" fill="#163a4f" /> 
      <path d="M26,72 C37,71 46,66 55,61 C46,69 36,77 26,78" stroke="#f5fbff" strokeWidth="3" fill="none" strokeLinecap="round" /> 
      <path d="M20,75 C29,77 37,75 44,71" stroke="#d95f5f" strokeWidth="1.3" fill="none" /> 
      {/* Blowhole hint */} 
      <ellipse cx="106" cy="29" rx="2" ry="1" fill="#1c3d52" opacity="0.5" />
    </svg>
  );
}

export function Shell({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sGrad" cx="50%" cy="90%" r="75%">
          <stop offset="0%" stopColor="#fff8ea" />
          <stop offset="30%" stopColor="#ffe4b8" />
          <stop offset="65%" stopColor="#e8a86a" />
          <stop offset="100%" stopColor="#b8733c" />
        </radialGradient>
        <linearGradient id="sRidge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff9ee" />
          <stop offset="100%" stopColor="#c88040" />
        </linearGradient>
        <radialGradient id="sInner" cx="50%" cy="80%" r="40%">
          <stop offset="0%" stopColor="#fff3d6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#e8a86a" stopOpacity="0" />
        </radialGradient>
      </defs> 
      {/* Shadow */} 
      <ellipse cx="60" cy="110" rx="24" ry="5" fill="#5a3a1a" opacity="0.2" /> 
      {/* Fan shell body */} 
      <path d="M60,106 C26,106 12,70 20,38 C28,52 38,62 48,64 C38,48 42,28 54,16 C56,34 60,48 60,48 C60,48 64,34 66,16 C78,28 82,48 72,64 C82,62 92,52 100,38 C108,70 94,106 60,106 Z" fill="url(#sGrad)" /> 
      {/* Inner glow */} 
      <path d="M60,106 C34,106 22,76 28,48 C36,58 44,64 52,64 C44,52 46,36 54,24 C56,38 60,50 60,50 C60,50 64,38 66,24 C74,36 76,52 68,64 C76,64 84,58 92,48 C98,76 86,106 60,106 Z" fill="url(#sInner)" /> 
      {/* Ridges */} 
      <g stroke="url(#sRidge)" strokeWidth="1.2" fill="none" opacity="0.7">
        <path d="M60,106 C54,82 52,58 56,24" />
        <path d="M60,106 C66,82 68,58 64,24" />
        <path d="M60,106 C46,84 38,62 36,42" />
        <path d="M60,106 C74,84 82,62 84,42" />
        <path d="M60,106 C36,86 26,66 22,48" />
        <path d="M60,106 C84,86 94,66 98,48" />
        <path d="M60,106 C42,88 34,68 30,50" />
        <path d="M60,106 C78,88 86,68 90,50" />
      </g> 
      {/* Growth rings */} 
      <g stroke="#c8864a" strokeWidth="0.6" fill="none" opacity="0.35">
        <path d="M34,80 C44,76 56,74 60,74 C64,74 76,76 86,80" />
        <path d="M30,66 C42,60 54,58 60,58 C66,58 78,60 90,66" />
        <path d="M34,52 C44,48 54,46 60,46 C66,46 76,48 86,52" />
      </g> 
      {/* Hinge */} 
      <ellipse cx="60" cy="106" rx="12" ry="4.5" fill="#8c5a2e" opacity="0.6" /> 
      <ellipse cx="60" cy="106" rx="6" ry="2.5" fill="#6b4420" opacity="0.4" />
    </svg>
  );
}

export function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="spGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fffbe6" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#ffe49a" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffd34d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="spRay" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffef5" />
          <stop offset="50%" stopColor="#fff3c4" />
          <stop offset="100%" stopColor="#ffd34d" />
        </linearGradient>
      </defs> 
      {/* Outer glow */} 
      <circle cx="40" cy="40" r="28" fill="url(#spGlow)" /> 
      {/* Main sparkle */} 
      <path d="M40,4 C42,22 52,32 70,34 C52,36 42,46 40,64 C38,46 28,36 10,34 C28,32 38,22 40,4 Z" fill="url(#spRay)" /> 
      {/* Inner bright core */} 
      <path d="M40,18 C41,30 46,35 58,36 C46,37 41,42 40,54 C39,42 34,37 22,36 C34,35 39,30 40,18 Z" fill="#fffef5" opacity="0.7" /> 
      {/* Small diagonal sparkles */} 
      <path d="M40,30 C40.5,36 43,38.5 49,39 C43,39.5 40.5,42 40,48 C39.5,42 37,39.5 31,39 C37,38.5 39.5,36 40,30 Z" fill="#fff" opacity="0.9" /> 
      {/* Tiny accent rays */} 
      <line x1="40" y1="8" x2="40" y2="12" stroke="#fffbe6" strokeWidth="0.8" opacity="0.6" /> 
      <line x1="40" y1="56" x2="40" y2="60" stroke="#fffbe6" strokeWidth="0.8" opacity="0.6" /> 
      <line x1="14" y1="34" x2="18" y2="34" stroke="#fffbe6" strokeWidth="0.8" opacity="0.6" /> 
      <line x1="62" y1="34" x2="66" y2="34" stroke="#fffbe6" strokeWidth="0.8" opacity="0.6" />
    </svg>
  );
}
