'use client'
import Image from "next/image";
import { useEffect, useState } from 'react';

export default function InitialLoader() {
  const [status, setStatus] = useState('SYSTEM INITIALIZING');

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus((prev) =>
        prev === 'SYSTEM INITIALIZING' ? 'LOADING DATA' : 'SYSTEM INITIALIZING'
      );
    }, 1500);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex items-center justify-center h-screen bg-[#0f0f1a] overflow-hidden">
    <div className="text-center relative w-full max-w-2xl px-5">
      <div className="relative text-4xl md:text-6xl font-bold text-white uppercase tracking-widest animate-[glitch-skew_1s_infinite_alternate-reverse]">
        LOADING
        <div className="absolute top-0 left-[2px] w-full h-full text-[#f0f] animate-[glitch-anim_5s_infinite_alternate-reverse] clip-path-top text-shadow-left">
          LOADING
        </div>
        <div className="absolute top-0 left-[-2px] w-full h-full text-[#0ff] animate-[glitch-anim2_1s_infinite_alternate-reverse] clip-path-bottom text-shadow-right">
          LOADING
        </div>
      </div>
        <div className="text-white/60 text-sm mt-2 tracking-widest uppercase animate-[blink_1s_infinite]">
        {status}
      </div>
    </div>
  </div>
  );
}
