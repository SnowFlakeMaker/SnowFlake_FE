// contexts/SoundContext.jsx
import { createContext, useContext, useState } from "react";

const SoundContext = createContext();

export const useSound = () => useContext(SoundContext);

export function SoundProvider({ children }) {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <SoundContext.Provider value={{ isMuted, setIsMuted }}>
      {children}
    </SoundContext.Provider>
  );
}