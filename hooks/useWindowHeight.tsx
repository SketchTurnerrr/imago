import { useEffect, useState } from 'react';

export const useWindowHeight = () => {
  const [windowHeight, setWindowHeight] = useState<number>(
    typeof window !== 'undefined' ? window.innerHeight : 0
  );

  useEffect(() => {
    if (window) {
      const windowSize = window?.innerHeight;
      const h = windowSize;
      setWindowHeight(h);
    }
  }, []);

  return windowHeight;
};
