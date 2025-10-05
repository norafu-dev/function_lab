import { useEffect, useRef, useState } from "react";

const MOBILE_BREAKPOINT = 640;

export default function useViewport() {
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(768);
  const heightLockedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function onResize() {
      setWidth(window.innerWidth);
      if (!heightLockedRef.current || window.innerHeight > height) {
        setHeight(window.innerHeight);
      }
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [height]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (heightLockedRef.current) return;
    const timeout = setTimeout(() => {
      if (window.innerHeight > 0) {
        setHeight(window.innerHeight);
      }
      if (/Mobi|Android/i.test(window.navigator.userAgent)) {
        heightLockedRef.current = true;
      }
    }, 50);
    return () => clearTimeout(timeout);
  }, []);

  const isMobile = width < MOBILE_BREAKPOINT;
  return { isMobile, width, height };
}
