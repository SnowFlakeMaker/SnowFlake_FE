// components/BgmPlayer.jsx
import { useEffect, useRef, useState } from "react";
import { useSound } from "./Soundcontext";

export default function AudioPlayer() {
    const audioRef = useRef(null);
    const { isMuted } = useSound();
  
    useEffect(() => {
      const audio = audioRef.current;
      if (audio) {
        audio.muted = isMuted;
        audio.play().catch(err => console.log("🔇 자동 재생 실패:", err));
      }
    }, [isMuted]);
  
    return <audio ref={audioRef} src="/music/playing.mp3" loop autoPlay />;
}