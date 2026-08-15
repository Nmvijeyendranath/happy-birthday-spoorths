import { useEffect } from 'react';
import gsap from 'gsap';

export default function Clouds() {
  useEffect(() => {
    const turbBg = document.getElementById('turbulence-bg');
    const turbFg = document.getElementById('turbulence-fg');
    let seedVal = 1;

    const onTick = () => {
      seedVal += 0.15;
      if (turbBg && turbFg) {
        turbBg.setAttribute('seed', Math.floor(seedVal).toString());
        turbFg.setAttribute('seed', Math.floor(seedVal + 50).toString());
      }
    };

    gsap.ticker.add(onTick);

    return () => {
      gsap.ticker.remove(onTick);
    };
  }, []);

  return (
    <>
      {/* Dynamic SVG Noise Filters */}
      <svg className="svg-filter-holder">
        <filter id="cloud-noise-bg">
          <feTurbulence id="turbulence-bg" type="fractalNoise" baseFrequency="0.009" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="140" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        <filter id="cloud-noise-fg">
          <feTurbulence id="turbulence-fg" type="fractalNoise" baseFrequency="0.014" numOctaves="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="95" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Cloud Transition Layers */}
      <div className="cloud-transition-wrapper">
        {/* Background Soft Clouds */}
        <div className="cloud-layer bg left"></div>
        <div className="cloud-layer bg right"></div>

        {/* Midground Volumetric Puffs */}
        <div className="cloud-layer mid left">
          <div className="puff puff-1"></div>
          <div className="puff puff-2"></div>
          <div className="puff puff-3"></div>
        </div>
        <div className="cloud-layer mid right">
          <div className="puff puff-1"></div>
          <div className="puff puff-2"></div>
          <div className="puff puff-3"></div>
        </div>

        {/* Foreground Dense Smoke */}
        <div className="cloud-layer fg left"></div>
        <div className="cloud-layer fg right"></div>

        {/* Center Fog Flash */}
        <div className="center-fog"></div>
      </div>
    </>
  );
}
