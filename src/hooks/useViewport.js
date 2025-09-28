import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 640;

export default function useViewport() {
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(768);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function onResize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = width < MOBILE_BREAKPOINT;
  return { isMobile, width, height };
}
