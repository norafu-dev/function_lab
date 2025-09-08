import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 640;

export default function useViewport() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    function onResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = width < MOBILE_BREAKPOINT;
  return { isMobile, width };
}
