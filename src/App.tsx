import { useState, useEffect, useRef } from 'react';
import VideoBackground from '@/components/VideoBackground';
import Nav from '@/components/Nav';
import Hero from '@/components/sections/Hero';
import Letter from '@/components/sections/Letter';
import Moments from '@/components/sections/Moments';
import Gallery from '@/components/sections/Gallery';
import Journey from '@/components/sections/Journey';
import Finale from '@/components/sections/Finale';
import LoginGate from '@/components/LoginGate';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isLoggedIn && audioRef.current) {
      audioRef.current.volume = 1.0;
      audioRef.current.play().catch((e) => console.log('Audio play failed:', e));
    }
  }, [isLoggedIn]);

  return (
    <div className="relative min-h-screen">
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}calm-ocean-waves.mp3`} loop />
      <div className={isLoggedIn ? '' : 'h-screen overflow-hidden'}>
        <VideoBackground />
        <Nav />
        <main>
          <Hero />
          <Letter />
          <Moments />
          <Gallery />
          <Journey />
          <Finale />
        </main>
      </div>

      {!isLoggedIn && <LoginGate onComplete={() => setIsLoggedIn(true)} />}
    </div>
  );
}
