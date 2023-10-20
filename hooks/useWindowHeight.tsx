import { useEffect, useState } from 'react';

export const useWindowHeight = () => {
  const [windowHeight, setWindowHeight] = useState<number>();

  useEffect(() => {
    if (window) {
      const windowSize = window?.innerHeight;
      const h = windowSize;
      setWindowHeight(h);
    }
  }, []);

  return windowHeight;
};
