import { useState, useEffect } from "react";

export function useSettings() {
  const [offset, setOffset] = useState(() => {
    const savedOffset = localStorage.getItem("offset");
    return savedOffset !== null ? parseInt(savedOffset, 10) : 5;
  });

  const [soundBool, setSoundBool] = useState(() => {
    const savedSound = localStorage.getItem("sound");
    return savedSound !== null ? JSON.parse(savedSound) : true;
  });

  const [blackDotEffect, setBlackDotEffect] = useState(() => {
    const savedDotEffectState = localStorage.getItem("blackDotEffect");
    return savedDotEffectState ? JSON.parse(savedDotEffectState) : false;
  });

  useEffect(() => {
    localStorage.setItem("sound", soundBool);
  }, [soundBool]);

  useEffect(() => {
    localStorage.setItem("blackDotEffect", JSON.stringify(blackDotEffect));
  }, [blackDotEffect]);

  return { offset, setOffset, soundBool, setSoundBool, blackDotEffect, setBlackDotEffect };
}
